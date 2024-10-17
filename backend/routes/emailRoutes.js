const express = require('express');
const { sendGeneralMail } = require('../controllers/emailController');

const router = express.Router();

router.post('/send', sendGeneralMail);

module.exports = router;
