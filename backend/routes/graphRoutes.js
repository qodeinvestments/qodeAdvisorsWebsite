// routes/graphRoutes.js
const express = require('express');
const router = express.Router();
const { msalClient, getGraphClient } = require('../config/graphConfig');

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
// Redirect handler
router.get('/redirect', async (req, res) => {
    if (!req.session) {
        console.error('Session not initialized');
        return res.status(500).json({ error: 'Session management error' });
    }

    const tokenRequest = {
        code: req.query.code,
        scopes: ["https://graph.microsoft.com/Mail.Send"],
        redirectUri: process.env.MICROSOFT_REDIRECT_URI || "http://localhost:5000/api/graph/redirect",
    };

    try {
        const response = await msalClient.acquireTokenByCode(tokenRequest);
        //console.log('Token acquired:', response);
        
        // Store token in session
        req.session.graphToken = response.accessToken;
        
        // Save session explicitly
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Failed to save session' });
            }
            res.redirect('/email-success');
        });
    } catch (error) {
        console.error('Token Error:', error);
        res.status(500).json({ error: 'Token acquisition failed' });
    }
});

// Send email endpoint
router.post('/send-email', async (req, res) => {
    const { subject, content, toEmail } = req.body;
    if (!req.session) {
        return res.status(500).json({ error: 'Session management error' });
    }


    if (!req.session.graphToken) {
        return res.status(401).json({ error: 'Not authenticated with Microsoft Graph' });
    }

    try {
        const client = getGraphClient(req.session.graphToken);
        
        const mailBody = {
            message: {
                subject: subject,
                body: {
                    contentType: "Text",
                    content: content
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: toEmail
                        }
                    }
                ]
            }
        };

        await client.api('/me/sendMail').post(mailBody);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Send Mail Error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;