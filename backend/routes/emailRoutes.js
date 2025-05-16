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

// Rate limiter for OTP endpoints
const otpRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: "Too many OTP requests, please try again later.",
});

router.post("/otp/send", otpRateLimiter, async (req, res) => {
    const { phone } = req.body;
    console.log("Received OTP send request:", { phone });
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }
  
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
        const otp = response.data.OTP; // Use OTP from 2Factor.in
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
  
  router.post("/otp/verify", otpRateLimiter, async (req, res) => {
    const { phone, otp } = req.body;
    console.log("Received OTP verification request:", { phone, otp });
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
// Apply CSRF protection to all POST routes
router.post("/send", sendGeneralMail);
router.post("/forgot-password", sendForgetPasswordMail);

router.post("/sendEmail", upload.array("attachments", 10), async (req, res) => {
  try {
    const { fromName, fromEmail, to, toName, subject, body, includeSignature } = req.body;

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

module.exports = router;