// emailController.js
const { sendMail } = require('../services/mailService');
const { ClientEnquiry } = require('../models');

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
        initialInvestmentSize
    } = req.body;

    if (!userEmail || !fromName) {
        return res.status(400).json({
            error: 'Email and name are required'
        });
    }

    try {
        // const riskScore = await verifyRecaptchaToken(recaptchaToken, 'SUBMIT_FORM');

        // // Optionally, you can decide what to do if the risk score is too low.
        // if (riskScore < 0.5) {
        //   return res.status(400).json({ error: 'reCAPTCHA verification failed due to low risk score' });
        // }
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

        // Save form data to database with formatted HTML
        const clientEnquiry = await ClientEnquiry.create({
            name: fromName,
            email: userEmail,
            phone_number: phone,
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
            fromEmail : process.env.SENDER_EMAIL,
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
    const { fullName,userEmail, token } = req.body;
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
        // Construct the password reset URL using a dedicated domain.
        // Ensure FORGOT_PASSWORD_DOMAIN is defined in your environment variables, for example: "https://reset.yourdomain.com"
        const resetUrl = `${process.env.FORGOT_PASSWORD_DOMAIN}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(userEmail)}`;

        // Build the email body for the password reset
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

        // Send the password reset email using a different sender domain.
        // Here, we assume that sendMail accepts an optional "fromEmail" property.
        await sendMail({
            fromName: 'Support Team',
            fromEmail: process.env.FORGOT_PASSWORD_SENDER_EMAIL, // This sender email should belong to the different domain
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