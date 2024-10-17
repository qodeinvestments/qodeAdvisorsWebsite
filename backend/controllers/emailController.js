const { sendMail } = require('../services/mailService');

/**
 * Handle generic email sending for contact form submissions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const sendGeneralMail = async (req, res) => {
    const { to, subject, message, fromName } = req.body;

    if (!to || !subject || !message || !fromName) {
        return res.status(400).json({ error: 'All fields (to, subject, message, fromName) are required' });
    }

    try {
        // Send email to operations
        const operationsEmail = process.env.OPERATIONS_EMAIL;
        const operationsEmailBody = `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${fromName}</p>
            <p><strong>Email:</strong> ${to}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;
        await sendMail({
            fromName: 'Qode Contact Form',
            emailType: 'operations',
            to: operationsEmail,
            subject: 'New Contact Form Submission',
            body: operationsEmailBody
        });

        // Send confirmation email to user
        const userConfirmationBody = `
            <h2>Thank you for contacting Qode</h2>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p>Here's a copy of your message:</p>
            <p>${message}</p>
        `;
        await sendMail({
            fromName: 'Qode Support',
            emailType: 'operations',
            to: to,
            subject: "We've Received Your Message",
            body: userConfirmationBody
        });

        res.status(200).json({
            message: "Your message has been sent successfully. We'll get back to you soon!"
        });
    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({ error: 'Failed to process your request. Please try again later.' });
    }
};

module.exports = { sendGeneralMail };