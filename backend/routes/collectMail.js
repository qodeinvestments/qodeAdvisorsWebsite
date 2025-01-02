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
            // Send a welcome email to the subscriber
            const subjectToSubscriber = "Welcome to Qode Advisors Newsletter!";
            const textToSubscriber = "Thank you for subscribing to our newsletter. Stay tuned for the latest updates and insights.";

            try {
                // Email to subscriber
                await sendNewsletterMail(email, subjectToSubscriber);

                // Email to operations (Sanket Shinde)
                const operationsEmail = "sanket.shinde@qodeinvest.com";
                const subjectToOperations = "New Newsletter Subscription";
                const textToOperations = `A new subscriber just joined the newsletter: ${email}`;
                
                await sendNewsletterMail(operationsEmail, subjectToOperations, textToOperations);

                res.status(201).json({ message: "Subscribed! We’ve sent you an email—be sure to check your inbox." });
            } catch (emailError) {
                console.error('Error sending email:', emailError);
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
