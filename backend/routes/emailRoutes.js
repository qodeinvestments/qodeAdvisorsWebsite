const express = require("express");
const { sendGeneralMail, sendForgetPasswordMail } = require("../controllers/emailController");
const { sendMail } = require("../services/mailService");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const Redis = require("redis");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// Initialize Redis client
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../Uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// IP-based rate limiter for OTP endpoints
const ipRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 OTP requests per minute per IP
  keyGenerator: (req) => req.ip,
  message: "Too many OTP requests from this IP, please try again later.",
});

// Phone-based rate limiter for OTP endpoints
const otpRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute per phone
  message: "Too many OTP requests, please try again later.",
});

// Check for blocked IPs
router.use(async (req, res, next) => {
  const isBlocked = await redisClient.get(`blocked:ip:${req.ip}`);
  if (isBlocked) {
    return res.status(403).json({ error: "IP blocked due to suspicious activity" });
  }
  next();
});

// Optional: Check for disposable phone numbers (requires Numverify API key)

const isDisposable = async (phone) => {
  try {
    const response = await axios.get(
      `http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_API_KEY}&number=${phone}`
    );
    // Numverify doesn't directly return a 'disposable' field; infer from line_type or carrier
    const { valid, line_type, carrier } = response.data;
    if (!valid) return true; // Invalid numbers are treated as disposable
    // Example: Flag VoIP or known temporary carriers (customize based on your needs)
    const tempCarriers = ["TextNow", "Google Voice"];
    const isTempCarrier = tempCarriers.some((c) => carrier?.toLowerCase().includes(c.toLowerCase()));
    const isVoIP = line_type?.toLowerCase() === "voip";
    return isVoIP || isTempCarrier;
  } catch (error) {
    console.error("Numverify error:", error.message);
    return false; // Allow on error to avoid blocking legitimate users
  }
};


if (await isDisposable(phone)) {
  return res.status(400).json({ error: "Disposable phone numbers are not allowed" });
}

router.post("/otp/send", ipRateLimiter, otpRateLimiter, async (req, res) => {
  const { phone } = req.body;
  const ip = req.ip;
  console.log(`OTP request - Phone: ${phone}, IP: ${ip}, Time: ${new Date().toISOString()}`);

  // Store log in Redis
  const logEntry = {
    phone,
    ip,
    timestamp: Date.now(),
    action: "otp_send",
  };
  await redisClient.lPush("form:logs", JSON.stringify(logEntry));
  await redisClient.lTrim("form:logs", 0, 9999); // Keep latest 10,000 entries
  await redisClient.expire("form:logs", 7 * 24 * 60 * 60); // Expire after 7 days

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  // Optional: Block disposable phone numbers
  /*
  if (await isDisposable(phone)) {
    return res.status(400).json({ error: "Disposable phone numbers are not allowed" });
  }
  */

  const lastRequest = await redisClient.get(`otp:cooldown:${phone}`);
  if (lastRequest) {
    const remainingTime = Math.ceil(60 - (Date.now() - parseInt(lastRequest)) / 1000);
    if (remainingTime > 0) {
      return res.status(429).json({
        error: `Please wait ${remainingTime} seconds before requesting another OTP`,
      });
    }
  }

  try {
    const twoFactorUrl = `https://2factor.in/API/V1/${process.env.TWO_FACTOR_API_KEY}/SMS/${phone}/AUTOGEN2/OTP1`;
    console.log("Sending OTP request to 2Factor.in:", twoFactorUrl);
    const response = await axios.get(twoFactorUrl);
    console.log("2Factor.in response:", response.data);

    if (response.data.Status === "Success") {
      const otp = response.data.OTP;
      console.log("Storing OTP in Redis:", { phone, otp });
      await redisClient.setEx(`otp:${phone}`, 300, otp);
      const storedOtp = await redisClient.get(`otp:${phone}`);
      console.log("Verified OTP in Redis:", storedOtp);
      await redisClient.setEx(`otp:cooldown:${phone}`, 60, Date.now().toString());
      res.status(200).json({ message: "OTP sent to your phone number" });
    } else {
      console.error("2Factor.in error:", response.data.Details);
      res.status(500).json({ error: `Failed to send OTP: ${response.data.Details}` });
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message, error.stack);
    res.status(500).json({ error: `Failed to send OTP: ${error.message}` });
  }
});

router.post("/otp/verify", ipRateLimiter, otpRateLimiter, async (req, res) => {
  const { phone, otp } = req.body;
  const ip = req.ip;
  console.log(`OTP verify - Phone: ${phone}, IP: ${ip}, Time: ${new Date().toISOString()}`);

  // Store log in Redis
  const logEntry = {
    phone,
    ip,
    timestamp: Date.now(),
    action: "otp_verify",
  };
  await redisClient.lPush("form:logs", JSON.stringify(logEntry));
  await redisClient.lTrim("form:logs", 0, 9999);
  await redisClient.expire("form:logs", 7 * 24 * 60 * 60);

  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  try {
    const storedOtp = await redisClient.get(`otp:${phone}`);
    console.log("Stored OTP in Redis:", storedOtp);
    if (!storedOtp) {
      return res.status(400).json({ error: "OTP expired or not found" });
    }

    if (storedOtp !== otp) {
      const attemptsKey = `otp:attempts:${phone}`;
      let attempts = parseInt(await redisClient.get(attemptsKey) || "0");
      attempts += 1;
      await redisClient.setEx(attemptsKey, 300, attempts.toString());
      console.log("Failed attempt:", attempts);

      if (attempts >= 3) {
        await redisClient.del(`otp:${phone}`);
        return res.status(400).json({
          error: "Too many failed attempts. Please request a new OTP.",
        });
      }
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const verificationToken = require("crypto").randomBytes(32).toString("hex");
    await redisClient.setEx(`verified:${phone}`, 3600, verificationToken);
    await redisClient.del(`otp:${phone}`);
    await redisClient.del(`otp:attempts:${phone}`);

    res.status(200).json({ verificationToken });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

router.post("/send", async (req, res) => {
  const { userEmail, phone, fromName, message, verificationToken, formStartTime } = req.body;
  const ip = req.ip;
  const forwardedFor = req.headers['x-forwarded-for'] || 'none';
  const ips = req.ips || [];
  console.log(`Form submission - Email: ${userEmail}, Phone: ${phone}, IP: ${ip}, X-Forwarded-For: ${forwardedFor}, IPs: ${ips}, Time: ${new Date().toISOString()}`);

  // Store log in Redis
  const logEntry = {
    email: userEmail,
    phone,
    name: fromName,
    message,
    ip,
    forwardedFor, // Add for debugging
    timestamp: Date.now(),
    action: "form_submit",
  };
  await redisClient.lPush("form:logs", JSON.stringify(logEntry));
  await redisClient.lTrim("form:logs", 0, 9999);
  await redisClient.expire("form:logs", 7 * 24 * 60 * 60);

  // Validate form submission timing
  if (Date.now() - formStartTime < 10000) {
    return res.status(400).json({ error: "Form submitted too quickly" });
  }

  // Verify verificationToken
  try {
    const storedToken = await redisClient.get(`verified:${phone}`);
    if (!storedToken || storedToken !== verificationToken) {
      return res.status(400).json({ error: "Invalid verification token" });
    }

    // Validate email domain (block temporary emails)
    const tempEmailDomains = ["tempmail.com", "mailinator.com", "10minutemail.com"];
    const emailDomain = userEmail.split("@")[1];
    if (tempEmailDomains.includes(emailDomain)) {
      return res.status(400).json({ error: "Temporary email addresses are not allowed" });
    }

    // Use sendGeneralMail for email sending
    await sendGeneralMail(req, res);
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({ error: "Failed to process form submission", details: error.message });
  }
});

router.post("/forgot-password", sendForgetPasswordMail);

router.post("/sendEmail", upload.array("attachments", 10), async (req, res) => {
  try {
    const { fromName, fromEmail, to, toName, subject, body, includeSignature } = req.body;
    const ip = req.ip;
    console.log(`Send email - From: ${fromEmail}, To: ${to}, IP: ${ip}, Time: ${new Date().toISOString()}`);

    // Store log in Redis
    const logEntry = {
      email: fromEmail,
      to,
      ip,
      timestamp: Date.now(),
      action: "send_email",
    };
    await redisClient.lPush("form:logs", JSON.stringify(logEntry));
    await redisClient.lTrim("form:logs", 0, 9999);
    await redisClient.expire("form:logs", 7 * 24 * 60 * 60);

    let attachments = [];
    if (req.files && req.files.length > 0) {
      attachments = req.files.map((file) => ({
        path: file.path,
        name: file.originalname,
        contentType: file.mimetype,
      }));
    }

    const shouldIncludeSignature =
      includeSignature === undefined
        ? true
        : includeSignature === "false"
          ? false
          : Boolean(includeSignature);

    const result = await sendMail({
      fromName,
      fromEmail,
      to,
      toName,
      subject,
      body,
      attachments,
      includeSignature: shouldIncludeSignature,
    });

    if (attachments.length > 0) {
      attachments.forEach((attachment) => {
        if (attachment.path && fs.existsSync(attachment.path)) {
          fs.unlinkSync(attachment.path);
        }
      });
    }

    if (result.success) {
      res.status(200).json({
        message: "Email sent successfully",
        messageId: result.messageId,
        status: result.deliveryStatus,
      });
    } else {
      res.status(400).json({
        error: "Failed to send email",
        reason: result.reason,
        details: result.error,
      });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

router.post("/sendEmailWithInlineAttachments", express.json({ limit: "50mb" }), async (req, res) => {
  try {
    const { fromName, fromEmail, to, toName, subject, body, attachments, includeSignature } = req.body;
    const ip = req.ip;
    console.log(`Send email with inline attachments - From: ${fromEmail}, To: ${to}, IP: ${ip}, Time: ${new Date().toISOString()}`);

    // Store log in Redis
    const logEntry = {
      email: fromEmail,
      to,
      ip,
      timestamp: Date.now(),
      action: "send_email_inline",
    };
    await redisClient.lPush("form:logs", JSON.stringify(logEntry));
    await redisClient.lTrim("form:logs", 0, 9999);
    await redisClient.expire("form:logs", 7 * 24 * 60 * 60);

    const result = await sendMail({
      fromName,
      fromEmail,
      to,
      toName,
      subject,
      body,
      attachments: attachments || [],
      includeSignature: includeSignature !== false,
    });

    if (result.success) {
      res.status(200).json({
        message: "Email sent successfully",
        messageId: result.messageId,
        status: result.deliveryStatus,
      });
    } else {
      res.status(400).json({
        error: "Failed to send email",
        reason: result.reason,
        details: result.error,
      });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

// Admin route to analyze logs
const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};

router.get("/logs", isAdmin, async (req, res) => {
  try {
    const logs = await redisClient.lRange("form:logs", 0, -1);
    const parsedLogs = logs.map((log) => JSON.parse(log));

    // Group by IP
    const ipSummary = parsedLogs.reduce((acc, log) => {
      acc[log.ip] = acc[log.ip] || { count: 0, actions: [], phones: new Set(), emails: new Set() };
      acc[log.ip].count += 1;
      acc[log.ip].actions.push(log.action);
      if (log.phone) acc[log.ip].phones.add(log.phone);
      if (log.email) acc[log.ip].emails.add(log.email);
      return acc;
    }, {});

    // Convert Sets to arrays for JSON response
    const result = Object.entries(ipSummary).map(([ip, data]) => ({
      ip,
      submissionCount: data.count,
      uniquePhones: Array.from(data.phones).length,
      uniqueEmails: Array.from(data.emails).length,
      actions: data.actions,
      phones: Array.from(data.phones),
      emails: Array.from(data.emails),
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

module.exports = router;