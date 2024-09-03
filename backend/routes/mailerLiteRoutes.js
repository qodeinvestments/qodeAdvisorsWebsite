const express = require('express');
const sendNewsletterMail = require('../controllers/sendMail');  // Correct import

module.exports = (mailerlite) => {
    const router = express.Router();

    router.post('/subscribe', async (req, res) => {
        try {
            // console.log('Request body:', req.body);
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }
            const params = {
                email: email,
                status: 'active'
            };
            const response = await mailerlite.subscribers.createOrUpdate(params);

            if (response.status === 200) {
                const subject = 'Qode Newsletter Subscription';
                const text = 'Hello,\n\nThank you for subscribing to the Qode Newsletter! We are excited to have you on board.\n\nBest regards,\nThe Qode Team';
                try {
                    await sendNewsletterMail(email, subject, text);
                    // console.log('Confirmation email sent successfully');
                } catch (error) {
                    console.error('Error sending confirmation email:', error);
                }
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
