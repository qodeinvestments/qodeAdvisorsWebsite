const nodemailer = require('nodemailer');

function sendNewsletterMail(email, subject, text) {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "tech@qodeinvest.com",
            pass: "gnkz lwxf aexp bpri"
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'tech@qodeinvest.com',
        to: email,
        subject: subject,
        text: text
    };

    // Send the email
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
                reject(error);
            } else {
                console.log('Email sent successfully!');
                resolve(info);
            }
        });
    });
}

module.exports = sendNewsletterMail;