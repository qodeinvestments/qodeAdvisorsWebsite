const { sendMail } = require('../services/mailService');
const { ClientEnquiry } = require('../models');
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');
const twilio = require('twilio');
const crypto = require('crypto');

// Initialize Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

// Initialize reCAPTCHA client
const recaptchaClient = new RecaptchaEnterpriseServiceClient();

// Temporary in-memory store for verification data (use Redis/database in production)
const verificationStore = new Map();

// Generate a 6-digit code for email verification
// const generateCode = () => crypto.randomInt(100000, 999999).toString();

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
        console.error('reCAPTCHA verification error:', error);
        throw new Error('reCAPTCHA verification failed');
    }
};

// Send phone OTP
const sendPhoneOtp = async (req, res) => {
    const { phone } = req.body;

    if (!phone || !/^\+\d{1,15}$/.test(phone)) {
        return res.status(400).json({ error: 'Valid phone number is required' });
    }

    try {
        await twilioClient.verify.v2
            .services(verifyServiceSid)
            .verifications.create({ to: phone, channel: 'sms' });

        verificationStore.set(`phone:${phone}`, { verified: false, expires: Date.now() + 10 * 60 * 1000 });
        res.status(200).json({ message: 'OTP sent to phone' });
    } catch (error) {
        console.error('Error sending phone OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};

// Verify phone OTP
const verifyPhoneOtp = async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    const stored = verificationStore.get(`phone:${phone}`);
    if (!stored || stored.expires < Date.now()) {
        return res.status(400).json({ error: 'OTP expired or not found' });
    }

    try {
        const verificationCheck = await twilioClient.verify.v2
            .services(verifyServiceSid)
            .verificationChecks.create({ to: phone, code: otp });

        if (verificationCheck.status === 'approved') {
            verificationStore.set(`phone:${phone}`, { verified: true, expires: stored.expires });
            res.status(200).json({ message: 'Phone number verified' });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying phone OTP:', error);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
};

// Send email verification code
// const sendEmailCode = async (req, res) => {
//     const { email } = req.body;

//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         return res.status(400).json({ error: 'Valid email is required' });
//     }

//     const code = generateCode();
//     verificationStore.set(`email:${email}`, { code, verified: false, expires: Date.now() + 10 * 60 * 1000 });

//     try {
//         await sendMail({
//             fromName: 'Qode Support',
//             fromEmail: process.env.SENDER_EMAIL,
//             to: email,
//             subject: 'Verify Your Email',
//             body: `
//                 <p>Your verification code is <strong>${code}</strong></p>
//                 <p>This code will expire in 10 minutes.</p>
//             `,
//         });
//         res.status(200).json({ message: 'Verification code sent to email' });
//     } catch (error) {
//         console.error('Error sending email code:', error);
//         res.status(500).json({ error: 'Failed to send verification code' });
//     }
// };

// Verify email code
// const verifyEmailCode = async (req, res) => {
//     const { email, code } = req.body;

//     if (!email || !code) {
//         return res.status(400).json({ error: 'Email and code are required' });
//     }

//     const stored = verificationStore.get(`email:${email}`);
//     if (!stored || stored.expires < Date.now()) {
//         return res.status(400).json({ error: 'Code expired or not found' });
//     }

//     if (stored.code === code) {
//         verificationStore.set(`email:${email}`, { code, verified: true, expires: stored.expires });
//         res.status(200).json({ message: 'Email verified' });
//     } else {
//         res.status(400).json({ error: 'Invalid code' });
//     }
// };

// Send general inquiry email
const sendGeneralMail = async (req, res) => {
    const {
        userEmail,
        message,
        fromName,
        investmentGoal,
        phone,
        location,
        investmentExperience,
        preferredStrategy,
        initialInvestmentSize,
        recaptchaToken,
        website,
        formStartTime,
    } = req.body;

    // Reject if honeypot field is filled
    if (website) {
        return res.status(400).json({ error: 'Invalid submission' });
    }

    // Reject if form was filled too quickly (less than 5 seconds)
    if (formStartTime && (Date.now() - formStartTime) < 5000) {
        return res.status(400).json({ error: 'Form submitted too quickly' });
    }

    // Validate required fields
    if (!userEmail || !fromName || !phone || !recaptchaToken) {
        return res.status(400).json({
            error: 'Email, name, phone, and reCAPTCHA token are required',
        });
    }

    try {
        // Check phone verification status
        const phoneVerification = verificationStore.get(`phone:${phone}`);
        if (!phoneVerification || !phoneVerification.verified || phoneVerification.expires < Date.now()) {
            return res.status(400).json({ error: 'Phone number not verified or verification expired' });
        }

        // Check email verification status
        const emailVerification = verificationStore.get(`email:${userEmail}`);
        if (!emailVerification || !emailVerification.verified || emailVerification.expires < Date.now()) {
            return res.status(400).json({ error: 'Email not verified or verification expired' });
        }

        // Verify reCAPTCHA token
        const riskScore = await verifyRecaptchaToken(recaptchaToken, 'submit');
        if (riskScore < 0.5) {
            return res.status(400).json({ error: 'reCAPTCHA verification failed due to low risk score' });
        }

        // Build styled table with form inputs
        const formattedMessage = `
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6; color: #555;">
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Name:</td>
                    <td style="padding: 5px 0;">${fromName}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Email:</td>
                    <td style="padding: 5px 0;">${userEmail}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Phone Number:</td>
                    <td style="padding: 5px 0;">${phone}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Location:</td>
                    <td style="padding: 5px 0;">${location}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Investment Goal:</td>
                    <td style="padding: 5px 0;">${investmentGoal}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Investment Experience:</td>
                    <td style="padding: 5px 0;">${investmentExperience}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Preferred Strategy:</td>
                    <td style="padding: 5px 0;">${Array.isArray(preferredStrategy) ? preferredStrategy.join(", ") : preferredStrategy}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Initial Investment Size:</td>
                    <td style="padding: 5px 0;">${initialInvestmentSize}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Additional Message:</td>
                    <td style="padding: 5px 0;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
            </table>
        `;

        // Save form data to database
        const clientEnquiry = await ClientEnquiry.create({
            name: fromName,
            email: userEmail,
            phone_number: phone,
            location: location,
            investment_goal: investmentGoal,
            investment_experience: investmentExperience,
            preferred_strategy: Array.isArray(preferredStrategy) ? preferredStrategy.join(", ") : preferredStrategy,
            initial_investment_size: initialInvestmentSize,
            additional_message: message,
        });

        // Define the HTML signature
        const signature = `
            <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; font-family: Arial, sans-serif; font-size: 14px; color: #555;">
                <p>
                    <a href="https://qodeinvest.com" target="_blank">
                        <img src="https://workspace.qodeinvest.com/files/output-onlinejpgtools.png" width="114" alt="Qode Logo" style="display: block;">
                    </a>
                </p>
                <p style="margin: 0px;">M: +91 98203 00028</p>
                <p style="margin: 0px;">E: <a href="mailto:investor.relations@qodeinvest.com" style="color: #1a0dab; text-decoration: none;">investor.relations@qodeinvest.com</a></p>
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

        // Send email to operations team
        await sendMail({
            fromName: 'Qode Contact Form',
            to: 'saakshi.poddar@qodeinvest.com',
            subject: 'New Contact Form Submission',
            body: `
                <h2 style="color: #333; font-family: Arial, sans-serif;">New Contact Form Submission</h2>
                ${formattedMessage}
                ${signature}
            `,
        });

        // Send confirmation email to user
        await sendMail({
            fromName: 'Qode Support',
            fromEmail: process.env.SENDER_EMAIL,
            to: userEmail,
            subject: "We've Received Your Message",
            body: `
                <h2 style="color: #333; font-family: Arial, sans-serif;">Thank you for contacting Qode</h2>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <h3 style="margin-top: 15px; font-size: 16px;">Here's a copy of your message:</h3>
                ${formattedMessage}
                <p style="margin-top: 20px; font-weight: bold;">
                    Best regards,<br>
                    <span style="color: #000;">Qode Support Team</span>
                </p>
                ${signature}
            `,
        });

        // Clean up verification data after successful submission
        verificationStore.delete(`phone:${phone}`);
        verificationStore.delete(`email:${userEmail}`);

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

// Send forgot password email
const sendForgetPasswordMail = async (req, res) => {
    const { fullName, userEmail, token } = req.body;
    if (!userEmail || !token) {
        return res.status(400).json({
            error: 'Email and token are required'
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

module.exports = {
    sendGeneralMail,
    sendForgetPasswordMail,
    sendPhoneOtp,
    verifyPhoneOtp,
};