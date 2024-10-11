const nodemailer = require('nodemailer');

function sendNewsletterMail(email, subject) {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "tech@qodeinvest.com",
            pass: "gnkz lwxf aexp bpri" // Make sure to secure this, consider using environment variables
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
                    background-color: #ffffff; /* Changed from green to brown */
                    color:  #d1a47b;
                    padding: 10px;
                    text-align: center;
                    font-family: 'Playfair Display', serif; /* Company logo in Playfair font */
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
                    background-color: #d1a47b; /* Changed from green to brown */
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    margin-top: 20px;
                }

                .cta-button:hover {
                    background-color: #7a4e30; /* Slightly darker shade of brown on hover */
                }

                .cta-button:active {
                    color: white; /* Set active link color to white */
                }

            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Welcome to Qode</h1>
                </div>
                <div class="email-content">
                    <p>Hi,</p>
                    <p>Thank you for subscribing to the Qode Newsletter! We're excited to have you on board.</p>
                    <p>At Qode, we are committed to helping you grow your wealth through data-driven strategies.</p>
                    <p>In the meantime, feel free to check out our latest blog posts or reach out if you have any questions.</p>
                    <a href="https://qodeinvest.com/blogs" style="color: white; text-decoration: none;" class="cta-button">Visit Our Blog</a>
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
        from: 'tech@qodeinvest.com',
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
