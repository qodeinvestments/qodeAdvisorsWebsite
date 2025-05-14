const { sendMail } = require('../services/mailService');
const { ClientEnquiry } = require('../models');
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');
const fast2sms = require('fast-two-sms');
require('dotenv').config();
const axios = require('axios');

// Cache the reCAPTCHA client for performance
const recaptchaClient = new RecaptchaEnterpriseServiceClient();

// In-memory OTP store (use Redis or database in production)
const otpStore = {};


// reCAPTCHA verification function
const verifyRecaptchaToken = async (token, action) => {
    const projectID = 'qodeinvest';
    const recaptchaKey = '6LfDSyArAAAAAOCExGxlQORbh6kCxSsTo7QAZcLh';
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
        console.log(`reCAPTCHA response: ${JSON.stringify(response, null, 2)}`);

        if (!response.tokenProperties.valid) {
            console.error(`reCAPTCHA token invalid: ${response.tokenProperties.invalidReason}`);
            throw new Error('reCAPTCHA token is invalid');
        }

        if (response.tokenProperties.action !== action) {
            console.error('reCAPTCHA action mismatch');
            throw new Error('reCAPTCHA action does not match expected action');
        }

        return response.riskAnalysis.score;
    } catch (error) {
        console.error(' reCAPTCHA verification error:', error);
        throw new Error('reCAPTCHA verification failed');
    }
};



// Updated sendGeneralMail with OTP verification
const sendGeneralMail = async (req, res) => {
    const {
        userEmail,
        message,
        fromName,
        phone,
        recaptchaToken,
        website,
        formStartTime,
    } = req.body;

    // Honeypot
    if (website) {
        return res.status(400).json({ error: 'Invalid submission' });
    }

    // Too‐fast submissions
    if (formStartTime && (Date.now() - formStartTime) < 5000) {
        return res.status(400).json({ error: 'Form submitted too quickly' });
    }

    // Required fields
    if (!userEmail || !fromName || !phone || !recaptchaToken) {
        return res.status(400).json({
            error: 'Email, name, phone, message, and reCAPTCHA token are required',
        });
    }

    try {
        // reCAPTCHA check
        const riskScore = await verifyRecaptchaToken(recaptchaToken, 'submit');
        if (riskScore < 0.5) {
            return res.status(400).json({ error: 'reCAPTCHA verification failed' });
        }

        // Build message table...
        const formattedMessage = `
            <table> … </table>
        `;

        // Save to DB
        const clientEnquiry = await ClientEnquiry.create({
            name: fromName,
            email: userEmail,
            phone_number: phone,
            additional_message: message,
        });

        // Define signature…
        const signature = `…`;

        // Send to ops
        await sendMail({
            fromName: 'Qode Contact Form',
            to: 'saakshi.poddar@qodeinvest.com',
            subject: 'New Contact Form Submission',
            body: `<h2>New Contact Form Submission</h2>${formattedMessage}${signature}`,
        });

        // Confirmation to user
        await sendMail({
            fromName: 'Qode Support',
            fromEmail: process.env.SENDER_EMAIL,
            to: userEmail,
            subject: "We've Received Your Message",
            body: `<h2>Thank you for contacting Qode</h2>
                   <p>We have received your message and will get back to you soon.</p>
                   ${formattedMessage}
                   ${signature}`,
        });

        res.status(200).json({
            message: "Your message has been sent successfully. We'll get back to you soon!",
            enquiryId: clientEnquiry.id,
        });

    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({
            error: 'Failed to process your request. Please try again later.',
        });
    }
};

// Unchanged sendForgetPasswordMail
const sendForgetPasswordMail = async (req, res) => {
    const { fullName, userEmail, token } = req.body;
    if (!userEmail || !token) {
        return res.status(400).json({
            error: 'Email and token are required',
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
        const resetUrl = `${process.env.FORGOT_PASSWORD_DOMAIN}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(userEmail)}`;

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
            fromName: 'Support Team',
            fromEmail: process.env.FORGOT_PASSWORD_SENDER_EMAIL,
            to: userEmail,
            subject: 'Password Reset Request',
            body: emailBody,
        });

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error sending forgot password email:', error);
        res.status(500).json({ error: 'Failed to send password reset email' });
    }
};

module.exports = { sendGeneralMail, sendForgetPasswordMail };