const { sendMail } = require("../services/mailService");
const { ClientEnquiry } = require("../models");
const { RecaptchaEnterpriseServiceClient } = require("@google-cloud/recaptcha-enterprise");
const sanitizeHtml = require("sanitize-html");
const Redis = require("redis");
require("dotenv").config();

// Initialize Redis client
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect();

// Cache the reCAPTCHA client
const recaptchaClient = new RecaptchaEnterpriseServiceClient();

// reCAPTCHA verification function
const verifyRecaptchaToken = async (token, action) => {
  const projectID = "qodeinvest";
  const recaptchaKey = "6LfDSyArAAAAAOCExGxlQORbh6kCxSsTo7QAZcLh";
  const projectPath = recaptchaClient.projectPath(projectID);

  const request = {
    assessment: {
      event: {
        token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  try {
    const [response] = await recaptchaClient.createAssessment(request);
    if (!response.tokenProperties.valid) {
      console.error(`reCAPTCHA token invalid: ${response.tokenProperties.invalidReason}`);
      throw new Error("reCAPTCHA token is invalid");
    }
    if (response.tokenProperties.action !== action) {
      console.error("reCAPTCHA action mismatch");
      throw new Error("reCAPTCHA action does not match expected action");
    }
    return response.riskAnalysis.score;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    throw new Error("reCAPTCHA verification failed");
  }
};

// Updated sendGeneralMail
const sendGeneralMail = async (req, res) => {
  const { userEmail, message, fromName, phone, recaptchaToken, verificationToken, website, formStartTime } = req.body;

  // Honeypot
  if (website) {
    return res.status(400).json({ error: "Invalid submission" });
  }

  // Too-fast submissions
  if (formStartTime && Date.now() - formStartTime < 5000) {
    return res.status(400).json({ error: "Form submitted too quickly" });
  }

  // Required fields
  if (!userEmail || !fromName || !phone || !recaptchaToken || !verificationToken) {
    return res.status(400).json({
      error: "Email, name, phone, reCAPTCHA token, and verification token are required",
    });
  }

  try {
    // Verify OTP verification token
    const storedToken = await redisClient.get(`verified:${phone}`);
    if (!storedToken || storedToken !== verificationToken) {
      return res.status(400).json({ error: "Phone number not verified" });
    }

    // reCAPTCHA check
    const riskScore = await verifyRecaptchaToken(recaptchaToken, "submit");
    if (riskScore < 0.5) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }

    // Sanitize inputs
    const sanitizedMessage = sanitizeHtml(message, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const sanitizedFromName = sanitizeHtml(fromName);
    const sanitizedUserEmail = sanitizeHtml(userEmail);
    const sanitizedPhone = sanitizeHtml(phone);

    // Build styled table with form inputs
    const formattedMessage = `
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6; color: #555;">
        <tr>
          <td style="font-weight: bold; padding: 5px 0; color: #333;">Name:</td>
          <td style="padding: 5px 0;">${sanitizedFromName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px 0; color: #333;">Email:</td>
          <td style="padding: 5px 0;">${sanitizedUserEmail}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px 0; color: #333;">Phone Number:</td>
          <td style="padding: 5px 0;">${sanitizedPhone}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px 0; color: #333;">Additional Message:</td>
          <td style="padding: 5px 0;">${sanitizedMessage.replace(/\n/g, "<br>")}</td>
        </tr>
      </table>
    `;

    // Save to DB
    const clientEnquiry = await ClientEnquiry.create({
      name: sanitizedFromName,
      email: sanitizedUserEmail,
      phone_number: sanitizedPhone,
      additional_message: sanitizedMessage,
    });

    // Send to ops
    await sendMail({
      fromName: "Qode Contact Form",
      to: process.env.CONTACT_FORM_RECIPIENT,
      subject: "New Contact Form Submission",
      body: `<h2>New Contact Form Submission</h2>${formattedMessage}`,
    });

    // Confirmation to user
    await sendMail({
      fromName: "Qode Support",
      fromEmail: process.env.SENDER_EMAIL,
      to: sanitizedUserEmail,
      subject: "We've Received Your Message",
      body: `<h2>Thank you for contacting Qode</h2>
             <p>We have received your message and will get back to you soon.</p>
             ${formattedMessage}`,
    });

    // Clear verification token
    await redisClient.del(`verified:${phone}`);

    res.status(200).json({
      message: "Your message has been sent successfully. We'll get back to you soon!",
      enquiryId: clientEnquiry.id,
    });
  } catch (error) {
    console.error("Error handling contact form:", error);
    res.status(500).json({
      error: "Failed to process your request. Please try again later.",
    });
  }
};

// Unchanged sendForgetPasswordMail
const sendForgetPasswordMail = async (req, res) => {
  const { fullName, userEmail, token } = req.body;
  if (!userEmail || !token) {
    return res.status(400).json({
      error: "Email and token are required",
    });
  }
  try {
    const pwdSignature = `
      <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; font-family: Arial, sans-serif; font-size: 14px; color: #555;">
        <p>
          <a href="https://qodeinvest.com" target="_blank">
            <img src="https://workspace.qodeinvest.com/files/output-onlinejpgtools.png" width="114" alt="Qode Logo" style="display: block;">
          </a>
        </p>
        <p style="margin: 0px;">E: <a href="mailto:support@qodeinvest.com" style="color: #1a0dab; text-decoration: none;">support@qodeinvest.com</a></p>
        <p style="margin: 0px;">W: <a href="http://www.qodeinvest.com" style="color: #1a0dab; text-decoration: none;">www.qodeinvest.com</a></p>
        <p style="margin: 0px;">A: 2nd Floor, Tree House, Raghuvanshi Mills, Lower Parel, Mumbai-400013</p>
        <p style="margin: 0px;">Follow us:</p>
        <p>
          <a style="margin: 0px;" href="https://www.linkedin.com/company/qode1/" target="_blank">
            <img src="https://workspace.qodeinvest.com/files/linkedin%20(1).png" alt="LinkedIn" style="width: 24px; height: 24px;">
          </a>
        </p>
      </div>
    `;
    const resetUrl = `${process.env.FORGOT_PASSWORD_DOMAIN}/reset-password?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(userEmail)}`;

    const emailBody = `
      <p>Hi, ${fullName}</p>
      <p>
        We received a request to reset your password for your account. 
        If you initiated this request, please <a href="${resetUrl}">click here</a> to reset your password.
      </p>
      <p>
        This link will expire in 10 minutes for security reasons. 
        If you did not request a password reset, please ignore this email. 
        Your account remains secure.
      </p>
      <p>
        If you need any further assistance, feel free to contact our team.
      </p>
      <p>
        Best regards,<br/>Support Team
      </p>
      ${pwdSignature}
    `;

    await sendMail({
      fromName: "Support Team",
      fromEmail: process.env.FORGOT_PASSWORD_SENDER_EMAIL,
      to: userEmail,
      subject: "Password Reset Request",
      body: emailBody,
    });

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    res.status(500).json({ error: "Failed to send password reset email" });
  }
};

module.exports = { sendGeneralMail, sendForgetPasswordMail };