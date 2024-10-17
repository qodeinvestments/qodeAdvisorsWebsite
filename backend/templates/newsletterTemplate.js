function generateNewsletterHTML() {
    return `
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Playfair+Display:wght@400;700&display=swap');
                body {
                    font-family: 'DM Sans', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 30px auto;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    background-color: #ffffff;
                    color: #d1a47b;
                    padding: 10px;
                    text-align: center;
                    font-family: 'Playfair Display', serif;
                    font-size: 24px;
                    font-weight: 700;
                }
                .email-content {
                    margin: 20px 0;
                }
                .email-content p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #333333;
                }
                .cta-button {
                    background-color: #d1a47b;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    margin-top: 20px;
                }
                .cta-button:hover {
                    background-color: #7a4e30;
                }
                .cta-button:active {
                    color: white;
                }
                .email-footer {
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
            
                <div class="email-content">
                    <p>Hey,</p>
                    <p>I'm Harshal, I'm in charge of marketing and communication at Qode.</p>
                    <p>I come from the creative field and this finance and investing world always felt overwhelming and complex.</p>
                    <p>But, after spending a few days at Qode, I realized that it's not as complicated as I thought it was.</p>
                    <p>(Sometimes these finance people don't realize that they are talking in a language only people from finance can understand!)</p>
                    <p>At Qode, we make sure our communication is simple, and that's why I’m here.</p>
                    <p>Thank you for subscribing! Stay tuned for more updates.</p>
                    <a href="https://qodeinvest.com/blogs" style="color:#ffff" class="cta-button">Read More</a>
                </div>
                <div class="email-footer">
                    <p>&copy; 2024 Qode Advisors LLP, All rights reserved.</p>
                    <p>If you wish to unsubscribe, please <a href="#">click here</a>.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

module.exports = { generateNewsletterHTML };
