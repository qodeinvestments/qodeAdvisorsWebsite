const generateEmailHTML = ({
    headerText = 'Qode',
    headerColor = '#d1a47b',
    bodyContent,
    ctaText,
    ctaLink,
    footerText = '© 2024 Qode Advisors LLP, All rights reserved.',
    unsubscribeLink = '#'
}) => {
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
                    color: ${headerColor};
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
                    background-color: ${headerColor};
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    margin-top: 20px;
                }
                .cta-button:hover {
                    opacity: 0.8;
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
                    ${bodyContent}
                    ${ctaText && ctaLink ? `<a href="${ctaLink}" style="color:#ffff" class="cta-button">${ctaText}</a>` : ''}
                </div>
                <div class="email-footer">
                    <p>${footerText}</p>
                    <p>If you wish to unsubscribe, please <a href="${unsubscribeLink}">click here</a>.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

module.exports = { generateEmailHTML };