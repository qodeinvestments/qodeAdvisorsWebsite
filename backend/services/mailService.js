const nodemailer = require('nodemailer');

// Create a transporter using environment variables
const createTransporter = (user, pass) => {
    return nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user,
            pass,
        },
    });
};

const sendMail = ({ fromName, emailType, to, subject, body }) => {
    let user, pass;

    if (emailType === 'newsletter') {
        user = process.env.NEWSLETTER_EMAIL;
        pass = process.env.NEWSLETTER_EMAIL_PASS;
    } else if (emailType === 'operations') {
        user = process.env.CLIENT_ADVISORY_EMAIL;
        pass = process.env.CLIENT_ADVISORY_EMAIL_PASS;
    } else {
        throw new Error('Invalid email type specified.');
    }
    console.log({
        user,
        pass,
        from: `"${fromName}" <${user}>`,
        to,
        subject,
        html: body
    });

    const transporter = createTransporter(user, pass);
    const mailOptions = {
        from: `"${fromName}" <${user}>`,
        to,
        subject,
        html: body,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error.message);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info);
            }
        });
    });
};

module.exports = { sendMail };
