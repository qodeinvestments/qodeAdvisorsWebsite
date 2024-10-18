const { sendMail } = require('../services/mailService');
const { Email } = require('../models');
const { generateEmailHTML } = require('../templates/emailTemplate');



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
            const subject = "I'm going to keep things simple and straight with you";
            const body = generateEmailHTML({
                headerText: 'Welcome to Qode Newsletter',
                bodyContent: `
                    <p>Hey,</p>
                    <p>I'm Harshal, I'm in charge of marketing and communication at Qode.</p>
                    <p>I come from the creative field and this finance and investing world always felt overwhelming and complex.</p>
                    <p>But, after spending a few days at Qode, I realized that it's not as complicated as I thought it was.</p>
                    <p>(Sometimes these finance people don't realize that they are talking in a language only people from finance can understand!)</p>
                    <p>At Qode they did realize this! And wanted to make sure their communication and ideas are understood by all their investors. So they hired me to keep all their communication simple and straightforward not let it feel overwhelming for you. (I think they made the right decision picking someone who is not from finance.)</p>
                    <p>That’s it for now. </p>
                    <p>(P.S. If you want to know about our Investment strategies and investing principles you can read it here.)</p>
                `,
                ctaText: 'Read More',
                ctaLink: 'https://qodeinvest.com/blogs'
            });

            await sendMail({
                fromName: 'Harshal Pokle',
                emailType: 'newsletter',
                to: email,
                subject,
                body
            });
            res.status(201).json({ message: "Subscribed! We've sent you an email—be sure to check your inbox." });
        } else {
            res.status(200).json({ message: 'Email already subscribed.' });
        }
    } catch (error) {
        console.error('Error in newsletter subscription:', error);
        res.status(500).json({ error: 'Failed to subscribe to newsletter.' });
    }
};

module.exports = { subscribeToNewsletter };