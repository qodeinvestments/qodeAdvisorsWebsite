// emailController.js
const { sendMail } = require('../services/mailService');

/**
 * Handle email sending for contact form submissions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const sendGeneralMail = async (req, res) => {
    const { 
        userEmail, 
        message, 
        fromName, 
        investmentGoal, 
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
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Investment Goal:</td>
                    <td style="padding: 5px 0;">${investmentGoal}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Investment Experience:</td>
                    <td style="padding: 5px 0;">${investmentExperience}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px 0; color: #333;">Preferred Strategy:</td>
                    <td style="padding: 5px 0;">${preferredStrategy.join(", ")}</td>
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
            message: "Your message has been sent successfully. We'll get back to you soon!"
        });
    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({ 
            error: 'Failed to process your request. Please try again later.' 
        });
    }
};

module.exports = { sendGeneralMail };