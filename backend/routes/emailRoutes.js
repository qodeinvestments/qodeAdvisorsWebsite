// emailRoutes.js
const express = require('express');
const { sendGeneralMail, sendForgetPasswordMail } = require('../controllers/emailController');

const router = express.Router();

// Endpoint for processing contact form submissions
router.post('/send', sendGeneralMail);

// New endpoint for sending password reset emails
router.post('/forgot-password', sendForgetPasswordMail);

module.exports = router;
