// mailService.js
const msal = require('@azure/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        tenantId: process.env.TENANT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`
    }
};

const msalClient = new msal.ConfidentialClientApplication(msalConfig);

// Initialize Graph client with access token
const getGraphClient = async () => {
    try {
        const result = await msalClient.acquireTokenByClientCredential({
            scopes: ["https://graph.microsoft.com/.default"]
        });

        return Client.init({
            authProvider: (done) => {
                done(null, result.accessToken);
            }
        });
    } catch (error) {
        console.error('Error getting Graph client:', error);
        throw error;
    }
};

/**
 * Send email using Microsoft Graph API
 * @param {Object} options - Email options
 * @param {string} options.fromName - Sender display name
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.body - HTML email body
 * @returns {Promise<Object>} - Result of the operation
 */
async function sendMail({ fromName, to, subject, body }) {
    try {
        const client = await getGraphClient();
        
        const mailBody = {
            message: {
                subject,
                body: {
                    contentType: "HTML",
                    content: body
                },
                toRecipients: [{
                    emailAddress: {
                        address: to
                    }
                }],
                from: {
                    emailAddress: {
                        address: process.env.SENDER_EMAIL,
                        name: fromName
                    }
                }
            },
            saveToSentItems: true
        };

        await client.api(`/users/${process.env.SENDER_EMAIL}/sendMail`)
            .post(mailBody);

        console.log(`Email sent successfully to ${to}`);
        return { success: true, method: 'graph' };

    } catch (error) {
        console.error('Failed to send email via Graph API:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

module.exports = { sendMail };