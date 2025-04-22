const { sendMail } = require('../services/mailService');
const { ClientEnquiry } = require('../models');
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

// Cache the reCAPTCHA client for performance
const recaptchaClient = new RecaptchaEnterpriseServiceClient();

// reCAPTCHA verification function using @google-cloud/recaptcha-enterprise
const verifyRecaptchaToken = async (token, action) => {
    const projectID = 'qodeinvest'; // Your Google Cloud Project ID
    const recaptchaKey = '6LfDSyArAAAAAOCExGxlQORbh6kCxSsTo7QAZcLh'; // Your site key
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
        formStartTime
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
    if (!userEmail || !fromName || !recaptchaToken) {
        return res.status(400).json({
            error: 'Email, name, and reCAPTCHA token are required'
        });
    }

    try {
        // Verify reCAPTCHA token
        const riskScore = await verifyRecaptchaToken(recaptchaToken, 'submit');
        if (riskScore < 0.5) {
            return res.status(400).json({ error: 'reCAPTCHA verification failed due to low risk score' });
        }

        // Build styled table with form inputs, including location
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

        // Save form data to database, including location
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
            `
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
            `
        });

        res.status(200).json({
            message: "Your message has been sent successfully. We'll get back to you soon!",
            enquiryId: clientEnquiry.id
        });
    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({
            error: 'Failed to process your request. Please try again later.'
        });
    }
};

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

module.exports = { sendGeneralMail, sendForgetPasswordMail };