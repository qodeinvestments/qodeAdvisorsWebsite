const { sendMail } = require('../services/mailService');
const { Email } = require('../models');
const { generateNewsletterHTML } = require('../templates/newsletterTemplate');

// Newsletter subscription logic
const subscribeToNewsletter = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const [emailRecord, created] = await Email.findOrCreate({
            where: { email },
            defaults: { email },
        });


        if (created) {
            const subject = 'I’m going to keep things simple and straight with you';
            const body = generateNewsletterHTML(); // Use the HTML template

            await sendMail({
                fromName: 'Harshal Pokle',
                emailType: 'newsletter',
                to: email, // Changed from 'email' to 'to'
                subject,
                body
            });
            res.status(201).json({ message: 'Subscribed! We’ve sent you an email—be sure to check your inbox.' });
        } else {
            res.status(200).json({ message: 'Email already subscribed.' });
        }
    } catch (error) {
        console.error('Error in newsletter subscription:', error);
        res.status(500).json({ error: 'Failed to subscribe to newsletter.' });
    }
};

module.exports = { subscribeToNewsletter };
