const express = require('express');
const { sendGeneralMail, sendForgetPasswordMail } = require('../controllers/emailController');
const { sendMail } = require('../services/mailService');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Endpoint for processing contact form submissions
router.post('/send', sendGeneralMail);

// New endpoint for sending password reset emails
router.post('/forgot-password', sendForgetPasswordMail);



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Send email with attachments using multer
router.post('/sendEmail', upload.array('attachments', 10), async (req, res) => {
    try {
        const { fromName, fromEmail, to, toName, subject, body, includeSignature } = req.body;
        
        // Process uploaded files if any
        let attachments = [];
        if (req.files && req.files.length > 0) {
            //console.log('Processing', req.files.length, 'uploaded files');
            
            attachments = req.files.map(file => ({
                path: file.path,
                name: file.originalname,
                contentType: file.mimetype
            }));
        }
        
        // Parse includeSignature as boolean (form data comes as strings)
        const shouldIncludeSignature = includeSignature === undefined ? true : 
            (includeSignature === 'false' ? false : Boolean(includeSignature));
        
        const result = await sendMail({
            fromName,
            fromEmail,
            to,
            toName,
            subject,
            body,
            attachments,
            includeSignature: shouldIncludeSignature
        });
        
        // Clean up temporary files after sending
        if (attachments.length > 0) {
            attachments.forEach(attachment => {
                if (attachment.path && fs.existsSync(attachment.path)) {
                    fs.unlinkSync(attachment.path);
                }
            });
        }
        
        if (result.success) {
            res.status(200).json({ 
                message: 'Email sent successfully',
                messageId: result.messageId,
                status: result.deliveryStatus
            });
        } else {
            res.status(400).json({ 
                error: 'Failed to send email', 
                reason: result.reason,
                details: result.error
            });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

// Send email with JSON payload (for base64 attachments)
router.post('/sendEmailWithInlineAttachments', express.json({limit: '50mb'}), async (req, res) => {
    try {
        const { fromName, fromEmail, to, toName, subject, body, attachments, includeSignature } = req.body;
        
        //console.log('Received request to send email with inline attachments');
        
        const result = await sendMail({
            fromName,
            fromEmail,
            to,
            toName,
            subject,
            body,
            attachments: attachments || [],
            includeSignature: includeSignature !== false // Default to true if not specified
        });
        
        if (result.success) {
            res.status(200).json({ 
                message: 'Email sent successfully',
                messageId: result.messageId,
                status: result.deliveryStatus
            });
        } else {
            res.status(400).json({ 
                error: 'Failed to send email', 
                reason: result.reason,
                details: result.error
            });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

module.exports = router;