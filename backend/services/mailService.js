const msal = require('@azure/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
const fs = require('fs');
const { getSignature } = require('../utils/signature');

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
 * Send email using Microsoft Graph API with attachment support
 * @param {Object} options - Email options
 * @param {string} options.fromName - Sender display name
 * @param {string} options.fromEmail - Sender email address
 * @param {string} options.to - Recipient email address
 * @param {string} options.toName - Recipient name (optional)
 * @param {string} options.subject - Email subject
 * @param {string} options.body - HTML email body
 * @param {Array} options.attachments - Array of attachment objects
 * @param {boolean} options.includeSignature - Whether to include signature (default: true)
 * @returns {Promise<Object>} - Result of the operation with messageId
 */
async function sendMail({ fromName, fromEmail, to, toName, subject, body, attachments = [], includeSignature = true }) {
    //console.log('Sending email with fromName:', fromName, 'fromEmail:', fromEmail);
    
    try {
        const client = await getGraphClient();
        
        // Generate a unique message ID for tracking
        const messageId = `QDM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        // Only use X- prefixed headers as required by Graph API
        const internetMessageHeaders = [
            {
                name: "X-QodeTrackingID",
                value: messageId
            },
            {
                name: "X-QodeReadReceipt",
                value: process.env.SENDER_EMAIL
            }
        ];

        // Add signature to the email body if includeSignature is true
        let emailContent = body;
        if (includeSignature) {
            const signature = getSignature(fromEmail || process.env.SENDER_EMAIL);
            emailContent = `${body}${signature}`;
        }
        
        // Process attachments if provided
        const processedAttachments = await processAttachments(attachments);
        
        const mailBody = {
            message: {
                subject,
                body: {
                    contentType: "HTML",
                    content: emailContent
                },
                toRecipients: [{
                    emailAddress: {
                        address: to,
                        name: toName || to.split('@')[0]
                    }
                }],
                from: {
                    emailAddress: {
                        address: fromEmail || process.env.SENDER_EMAIL,
                        name: fromName
                    }
                },
                internetMessageHeaders
            },
            saveToSentItems: true
        };
        
        // Only add attachments if we have some
        if (processedAttachments.length > 0) {
            mailBody.message.attachments = processedAttachments;
        }
        
        // Debug the request structure (without showing the actual attachment content)
        const logBody = JSON.parse(JSON.stringify(mailBody));
        if (logBody.message.attachments && logBody.message.attachments.length > 0) {
            logBody.message.attachments.forEach(att => {
                if (att.contentBytes) {
                    att.contentBytes = '[BASE64_CONTENT_TRUNCATED]';
                }
            });
        }
        //console.log('Email request structure:', JSON.stringify(logBody));
        
        // Send the real request with actual content
        await client.api(`/users/${process.env.SENDER_EMAIL}/sendMail`)
            .post(mailBody);
            
        //console.log(`Email sent successfully to ${to} with tracking ID: ${messageId}`);
        
        // Store this message ID in your database for tracking purposes
        await storeEmailRecord(messageId, fromEmail, to, subject);
        
        return { 
            success: true, 
            method: 'graph',
            messageId,
            deliveryStatus: 'sent'
        };
    } catch (error) {
        console.error('Failed to send email via Graph API:', error);
        return {
            success: false,
            method: 'graph',
            error: error.message,
            deliveryStatus: 'failed',
            reason: extractErrorReason(error)
        };
    }
}

/**
 * Process attachment data for Microsoft Graph API
 * @param {Array} attachments - Array of attachment objects
 * @returns {Array} - Processed attachments for Graph API
 */
async function processAttachments(attachments) {
    if (!attachments || !attachments.length) return [];
    
    const processedAttachments = [];
    
    for (const attachment of attachments) {
        try {
            // Handle file path attachments
            if (attachment.path || attachment.filePath) {
                const filePath = attachment.path || attachment.filePath;
                const filename = attachment.name || filePath.split('/').pop();
                const contentType = attachment.contentType || getContentTypeFromFilename(filename);
                
                // Read file content and convert to base64
                const fileContent = await fs.promises.readFile(filePath);
                const base64Content = fileContent.toString('base64');
                
                processedAttachments.push({
                    '@odata.type': '#microsoft.graph.fileAttachment',
                    name: filename,
                    contentType,
                    contentBytes: base64Content
                });
            } 
            // Handle buffer attachments (already in memory)
            else if (attachment.buffer) {
                const base64Content = attachment.buffer.toString('base64');
                
                processedAttachments.push({
                    '@odata.type': '#microsoft.graph.fileAttachment',
                    name: attachment.name,
                    contentType: attachment.contentType || 'application/octet-stream',
                    contentBytes: base64Content
                });
            }
            // Handle already base64-encoded attachments
            else if (attachment.content || attachment.contentBytes) {
                const contentBytes = attachment.content || attachment.contentBytes;
                
                processedAttachments.push({
                    '@odata.type': '#microsoft.graph.fileAttachment',
                    name: attachment.name,
                    contentType: attachment.contentType || 'application/octet-stream',
                    contentBytes: contentBytes
                });
            }
        } catch (error) {
            console.error(`Error processing attachment ${attachment.name || 'unknown'}:`, error);
        }
    }
    
    return processedAttachments;
}

/**
 * Get content type based on file extension
 * @param {string} filename - Name of the file
 * @returns {string} - Content type
 */
function getContentTypeFromFilename(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const contentTypes = {
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'txt': 'text/plain',
        'csv': 'text/csv',
        'html': 'text/html'
    };
    
    return contentTypes[extension] || 'application/octet-stream';
}

/**
 * Store email tracking information in database
 */
async function storeEmailRecord(messageId, sender, recipient, subject) {
    // Implementation depends on your database setup
    //console.log(`Storing email record for tracking: ${messageId}`);
    // await db.emails.create({ messageId, sender, recipient, subject, status: 'sent', sentAt: new Date() });
}

/**
 * Extract meaningful error reason from Microsoft Graph errors
 */
function extractErrorReason(error) {
    if (error.response && error.response.error) {
        const graphError = error.response.error;
        
        // Handle recipient not found errors
        if (graphError.code === 'ErrorRecipientNotFound' || 
            (graphError.message && graphError.message.includes('RecipientNotFound'))) {
            return 'recipient_not_found';
        }
        
        // Handle mailbox full errors
        if (graphError.code === 'ErrorMailboxStorageQuotaExceeded' ||
            (graphError.message && graphError.message.includes('quota exceeded'))) {
            return 'mailbox_full';
        }
        
        // Return the error code if available
        return graphError.code || graphError.message;
    }
    
    // Check for error message strings
    if (error.message) {
        if (error.message.includes('RecipientNotFound')) return 'recipient_not_found';
        if (error.message.includes('550 5.1.10')) return 'recipient_not_found';
        if (error.message.includes('Cannot convert the literal')) return 'invalid_attachment_format';
    }
    
    return 'unknown_error';
}

module.exports = { 
    sendMail
};