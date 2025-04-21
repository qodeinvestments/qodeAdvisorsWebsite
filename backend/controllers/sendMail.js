const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const { msalClient, getGraphClient } = require('../config/graphConfig');

// Get access token for nodemailer
async function getNodemailerAccessToken() {
    try {
        const tokenEndpoint = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`;
        const params = new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            scope: 'https://outlook.office365.com/.default',
            grant_type: 'client_credentials',
        });

        const response = await axios.post(tokenEndpoint, params.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        if (!response.data?.access_token) {
            throw new Error('No access token received from Azure AD');
        }

        return response.data.access_token;
    } catch (error) {
        console.error('Failed to get nodemailer access token:', error.response?.data || error.message);
        throw error;
    }
}

// Create nodemailer transporter
async function createTransporter() {
    try {
        const accessToken = await getNodemailerAccessToken();
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                type: 'OAuth2',
                user: process.env.SENDER_EMAIL,
                accessToken,
            },
        });

        await transporter.verify();
        return transporter;
    } catch (error) {
        console.error('Error creating transporter:', error);
        throw error;
    }
}

// Authentication endpoint
router.get('/auth', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["https://graph.microsoft.com/Mail.Send"],
        redirectUri: process.env.MICROSOFT_REDIRECT_URI || "http://localhost:5000/api/graph/redirect",
    };

    msalClient.getAuthCodeUrl(authCodeUrlParameters)
        .then((response) => {
            res.redirect(response);
        })
        .catch((error) => {
            console.error('Auth URL Error:', error);
            res.status(500).json({ error: 'Authentication failed' });
        });
});

// Redirect handler
router.get('/redirect', async (req, res) => {
    if (!req.session) {
        return res.status(500).json({ error: 'Session management error' });
    }

    const tokenRequest = {
        code: req.query.code,
        scopes: ["https://graph.microsoft.com/Mail.Send"],
        redirectUri: process.env.MICROSOFT_REDIRECT_URI || "http://localhost:5000/api/graph/redirect",
    };

    try {
        const response = await msalClient.acquireTokenByCode(tokenRequest);
        req.session.graphToken = response.accessToken;
        res.redirect('/email-success');
    } catch (error) {
        console.error('Token Error:', error);
        res.status(500).json({ error: 'Token acquisition failed' });
    }
});

// Email success page
router.get('/email-success', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Authentication Success</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f5f5f5;
                    }
                    .success-container {
                        text-align: center;
                        padding: 2rem;
                        background: white;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .success-message {
                        color: #4CAF50;
                        margin-bottom: 1rem;
                    }
                    .back-button {
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="success-container">
                    <h1 class="success-message">Authentication Successful!</h1>
                    <p>You have successfully authenticated with Microsoft Graph.</p>
                    <a href="/" class="back-button">Return to Home</a>
                </div>
            </body>
        </html>
    `);
});

// Send email endpoint using nodemailer
router.post('/send-email', async (req, res) => {
    const { fromName, to, subject, body } = req.body;
    //console.log('Sending email:', { fromName, to, subject, body });
    
    try {
        // Try sending with nodemailer first
        const transporter = await createTransporter();
        const mailOptions = {
            from: `"${fromName}" <${process.env.SENDER_EMAIL}>`,
            to,
            subject,
            html: body,
        };

        const info = await transporter.sendMail(mailOptions);
        //console.log('Email sent successfully via nodemailer:', info.response);
        res.json({ message: 'Email sent successfully', method: 'nodemailer' });

    } catch (nodemailerError) {
        console.error('Nodemailer failed, trying Microsoft Graph:', nodemailerError);

        // Fall back to Microsoft Graph if nodemailer fails
        try {
            if (!req.session?.graphToken) {
                throw new Error('Not authenticated with Microsoft Graph');
            }

            const client = getGraphClient(req.session.graphToken);
            const mailBody = {
                message: {
                    subject: subject,
                    body: {
                        contentType: "HTML",
                        content: body
                    },
                    toRecipients: [
                        {
                            emailAddress: {
                                address: to
                            }
                        }
                    ]
                }
            };

            await client.api('/me/sendMail').post(mailBody);
            res.json({ message: 'Email sent successfully', method: 'graph' });

        } catch (graphError) {
            console.error('Both email methods failed:', graphError);
            res.status(500).json({ 
                error: 'Failed to send email via both methods',
                nodemailerError: nodemailerError.message,
                graphError: graphError.message
            });
        }
    }
});

module.exports = router;