const nodemailer = require('nodemailer');

function sendNewsletterMail(email, subject) {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "harshal.pokle@qodeinvest.com",
            pass: "ghga nxbj vzqx fxty" // Make sure to secure this, consider using environment variables
        }
    });

    // Define the HTML content with inline CSS
    const htmlContent = `
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
                    color:  #d1a47b;
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
                .email-footer {
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #777777;
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

            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-content">
                    <p>Hey,</p>
                    <p>I'm Harshal, I'm in charge of marketing and communication at Qode.</p>
                    <p>I come from the creative field and this finance and investing world always felt overwhelming and complex.</p>
                    <p>But, after spending a few days at Qode I realized that it's not as complicated as I thought it was.</p>
                    <p>(Sometimes these finance people don't realize that they are talking in a language only people from finance can understand)</p>
                    <p>At Qode, they did realize this! And wanted to make sure their communication and ideas are understood by all their investors. So they hired me to keep all their communication simple and straightforward, and not let it feel overwhelming for you. (I think they made the right decision picking someone who is not from finance.)</p>
                    <p>That's it for now.</p>
                    <p>(P.S. If you want to know about our investment strategies and investing principles you can read it here.)</p>
                    <a href="https://qodeinvest.com/blogs" style="color: white; text-decoration: none;" class="cta-button">Read More</a>
                </div>
                <div class="email-footer">
                    <p>&copy; 2024 Qode Advisors LLP, All rights reserved.</p>
                    <p>If you wish to unsubscribe, please <a href="#">click here</a>.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    // Define the email options with HTML content
    const mailOptions = {
        from: '"Harshal Pokle" <harshal.pokle@qodeinvest.com>',
        to: email,
        subject: subject,
        html: htmlContent // Using HTML instead of plain text
    };

    // Send the email
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred:', error.message);
                reject(error);
            } else {
                console.log('Email sent successfully!');
                resolve(info);
            }
        });
    });
}

module.exports = sendNewsletterMail;