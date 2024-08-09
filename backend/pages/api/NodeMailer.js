const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MailerLite = require('@mailerlite/mailerlite-nodejs').default;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

const mailerlite = new MailerLite({
    api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYjBlOGUzMzA1Y2JjNWRlZDBkZDJiYjIxNTJhOWQ4YmNlYjE1NDlkZWVkMDQzMWQxNTk5OTkzM2JlYjIwOGMzYzhlMzg5MWIyZWI3ODJkZDIiLCJpYXQiOjE3MjMxMDc1MDcuMDc4MzczLCJuYmYiOjE3MjMxMDc1MDcuMDc4Mzc2LCJleHAiOjQ4Nzg3ODExMDcuMDc2MTE0LCJzdWIiOiI3MjU2MzAiLCJzY29wZXMiOltdfQ.DZEI9KCIaPtsb1-rq0WrHLW0VfCYPo-ERQPmT-FLCAHMVqYE79ijgMfF-u-VLUToWMfA36vD0HeSVZuGNFaxYBRBWTl9Aa3tOHc6Jn0xG4QWOO-o5jRsKYh2d_bolhgwXAM4hdv3W7xrXSl8bsaE0l0TdXxPXuckRghxdRGP8vLQj5J5C9j1P1th4tFtJGO85aubw3VpLYIimMboTCZpAp6-LZXAWXncKPu8e7yiothS4RtsHaje88AgLLrXBmoG6fpxl3QN0WPZnGYZXTwYu_yGv7Bm8mB2t51lsYDFvNznMS4JMqHXoPEakNd0OcrAko7ZrEr7vfcJ_g2Xq5-XIRCWNpGspoKVOG-qqdmLhst76P2HZEJIrBEZz7PnDtfG5cgCo9jzvLhtVyCf0hVn7C1m4FoVPZQJ01ecRFF6KQ1o5R5u2CQhwsKnWbGBfTdU9DnjmeW-WMvIAHIAX9MD13HV9OfGccb6fcSVAEKDmMmAUaKJEBBcn_VKSW51y8eA5lUr1WQYaXAhaF5LDe9YqJApXPcy8_UQAK7Uirm7otmsCiaUUJfx5X_CbN2iJIOueIj6uA6S9oEkteWMHwQoQXrzhhxGvWIEpEcVe6nRNcMmlnh9ptKPN7gruZcU6j9fX-eWUuI6kpVTuRSS-xDbwSeDRj6he73cPAL1Og1pZHk"
});

app.post('/api/mailerlite/subscribe', async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const params = {
            email: email,
            status: 'active'
        };

        const response = await mailerlite.subscribers.createOrUpdate(params);
        console.log('MailerLite response data:', response.data); // Log only the data part
        res.status(200).json({ message: 'Subscription successful', data: response.data });
    } catch (error) {
        console.error('Error:', error.message); // Log only the error message
        let errorMessage = 'An error occurred';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        res.status(500).json({ error: errorMessage });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});