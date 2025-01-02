const { sendMail } = require('../services/mailService');
const { Email } = require('../models');
const { generateEmailHTML } = require('../templates/emailTemplate');
const axios = require('axios');

// ERPNext API configuration
const ERPNEXT_CONFIG = {
    baseURL: 'https://workspace.qodeinvest.com',
    apiKey: '02289c500cb4be8',
    apiSecret: '00763e51509b7b0'
};

// Admin email for notifications
const ADMIN_EMAIL = 'investor.relations@qodeinvest.com';

// Function to send admin notification
const sendAdminNotification = async (subscriberEmail) => {
    const subject = 'New Newsletter Subscription';
    const body = generateEmailHTML({
        headerText: 'New Newsletter Subscriber',
        bodyContent: `
            <p>Hello Sanket,</p>
            <p>A new user has subscribed to the newsletter:</p>
            <p><strong>Email:</strong> ${subscriberEmail}</p>
            <p>The user has been added to both the local database and ERPNext email group.</p>
        `
    });

    await sendMail({
        fromName: 'Qode Newsletter System',
        emailType: 'notification',
        to: ADMIN_EMAIL,
        subject,
        body
    });
};

// Function to add email to ERPNext email group
const addToERPNextEmailGroup = async (email) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${ERPNEXT_CONFIG.baseURL}/api/resource/Email Group Member`,
            headers: {
                'Authorization': `token ${ERPNEXT_CONFIG.apiKey}:${ERPNEXT_CONFIG.apiSecret}`,
                'Content-Type': 'application/json'
            },
            data: {
                email_group: 'WebsiteEmails',
                email: email,
                unsubscribed: 0
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error adding email to ERPNext:', error.response?.data || error.message);
        throw error;
    }
};

const subscribeToNewsletter = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // First, save to local database
        const [emailRecord, created] = await Email.findOrCreate({
            where: { email },
            defaults: { email },
        });

        // If this is a new subscription
        if (created) {
            try {
                // Add to ERPNext email group
                await addToERPNextEmailGroup(email);

                // Generate and send welcome email
                const subject = "Thank you for subscribing to Qode Newsletter";
                const body = generateEmailHTML({
                    headerText: 'Welcome to Qode Newsletter',
                    bodyContent: `
                        <p>Dear Investor,</p>
                        <p>Thank you for subscribing to Qode Newsletter. We're excited to have you on board.</p>
                        <p>To help us serve you better, please reply to this email with the following information:</p>
                        <ul>
                            <li>Full Name</li>
                            <li>Contact Number</li>
                            <li>Investment Goals</li>
                            <li>Preferred Investment Amount</li>
                        </ul>
                        <p>Our team will reach out to you shortly after receiving your details.</p>
                        <p>Best regards,<br>Team Qode</p>
                    `,
                    ctaText: 'Visit Our Website',
                    ctaLink: 'https://qodeinvest.com'
                });

                await Promise.all([
                    sendMail({
                        fromName: 'Harshal Pokle',
                        emailType: 'newsletter',
                        to: email,
                        subject,
                        body
                    }),
                    sendAdminNotification(email)
                ]);

                res.status(201).json({ 
                    message: "Subscribed! We've sent you an email—be sure to check your inbox." 
                });
            } catch (error) {
                // If ERPNext integration fails, we should remove the email from our database
                await emailRecord.destroy();
                throw error;
            }
        } else {
            res.status(200).json({ message: 'Email already subscribed.' });
        }
    } catch (error) {
        console.error('Error in newsletter subscription:', error);
        res.status(500).json({ 
            error: 'Failed to subscribe to newsletter.',
            details: error.message 
        });
    }
};

module.exports = { subscribeToNewsletter };