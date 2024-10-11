const express = require('express');
const router = express.Router();
const { Email } = require('../models');
const sendNewsletterMail = require('../controllers/sendMail'); // Assuming your sendMail function is in this path

router.post('/collect', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const [emailRecord, created] = await Email.findOrCreate({
            where: { email },
            defaults: { email }
        });

        if (created) {
            // Send the email after successful subscription
            const subject = "Welcome to Qode Advisors Newsletter!";
            const text = "Thank you for subscribing to our newsletter. Stay tuned for the latest updates and insights.";

            // Call the sendNewsletterMail function to send the email
            try {
                await sendNewsletterMail(email, subject);
                res.status(201).json({ message: "Thank you for subscribing! Check your email for confirmation." });
            } catch (emailError) {
                console.error('Error sending confirmation email:', emailError);
                res.status(500).json({ message: "Subscription successful, but failed to send confirmation email." });
            }
        } else {
            res.status(200).json({ message: 'Email already exists' });
        }
    } catch (error) {
        console.error('Error collecting email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
