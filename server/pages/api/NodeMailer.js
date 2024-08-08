// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to handle CORS
app.use(cors());

app.post('/api/mailerlite/subscribe', async (req, res) => {
    try {
        console.log('Request body:', req.body); // Debugging line
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const apiKey = process.env.MAILER_LITE_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ message: 'MailerLite API key is not set' });
        }

        const response = await axios.post(
            'https://api.mailerlite.com/api/v2/subscribers',
            { email, type: 'active' },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-MailerLite-ApiKey': apiKey,
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message); // Log detailed error
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
