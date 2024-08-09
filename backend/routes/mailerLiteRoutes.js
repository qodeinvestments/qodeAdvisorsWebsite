const express = require('express');
const sendNewsletterMail = require('../controllers/sendMail');
i
module.exports = (mailerlite) => {
    const router = express.Router();

    router.post('/subscribe', async (req, res) => {
        try {
            console.log('Request body:', req.body);
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }
            const params = {
                email: email,
                status: 'active'
            };
            const response = await mailerlite.subscribers.createOrUpdate(params);
            // console.log('MailerLite response data:', response.data);

            if (response.status === 200) {
                const subject = 'Qode Newsletter Subscription';
                const text = 'Hello,\n\nThank you for subscribing to the Qode Newsletter! We are excited to have you on board.\n\nBest regards,\nThe Qode Team'; // plain text body
                sendNewsletterMail(email, subject, text);
            }
            res.status(200).json({ message: 'Subscription successful', data: response.data });
        } catch (error) {
            console.error('Error:', error.message);
            let errorMessage = 'An error occurred';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            res.status(500).json({ error: errorMessage });
        }
    });

    return router;
};