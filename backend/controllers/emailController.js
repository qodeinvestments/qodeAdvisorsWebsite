// emailController.js
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');
const client = new RecaptchaEnterpriseServiceClient();
const { sendMail } = require('../services/mailService');
const { ClientEnquiry, Email } = require('../models');
const moment = require('moment-timezone');

// Helper function to verify reCAPTCHA Enterprise token
const verifyRecaptchaToken = async (token) => {
  // Replace these with your environment variables or configuration values
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  const siteKey = process.env.RECAPTCHA_SITE_KEY;

  // The resource name of the project in which to create assessments, e.g.:
  // projects/<PROJECT_ID>
  const projectPath = client.projectPath(projectId);

  const request = {
    parent: projectPath,
    assessment: {
      event: {
        token,      // the token from the client
        siteKey,    // your reCAPTCHA site key
      },
    },
  };

  const [response] = await client.createAssessment(request);

  // Check if the token is valid
  if (
    !response.tokenProperties ||
    !response.tokenProperties.valid ||
    response.tokenProperties.invalidReason
  ) {
    throw new Error(
      `reCAPTCHA verification failed: ${response.tokenProperties && response.tokenProperties.invalidReason}`
    );
  }

  // Optionally, inspect the risk analysis score (0.0 to 1.0)
  // For example, if score is below 0.5, you might consider it suspicious.
  const score = response.riskAnalysis && response.riskAnalysis.score;
  if (score < 0.5) {
    throw new Error('reCAPTCHA risk score is too low');
  }

  return response;
};

const sendGeneralMail = async (req, res) => {
  const { 
    userEmail, 
    message, 
    fromName, 
    investmentGoal,
    phone,
    investmentExperience, 
    preferredStrategy,
    initialInvestmentSize,
    recaptchaToken // <-- expect the token here
  } = req.body;

  // Basic check for essential fields
  if (!userEmail || !fromName) {
    return res.status(400).json({ 
      error: 'Email and name are required' 
    });
  }
  
  // Verify that we received a reCAPTCHA token
  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA token missing' });
  }

  try {
    // Verify reCAPTCHA token before processing the submission
    await verifyRecaptchaToken(recaptchaToken);

    // Build a formatted message (HTML table) for the email
    const formattedMessage = `
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6; color: #555;">
          <tr>
              <td style="font-weight: bold; padding: 5px 0; color: #333;">Name:</td>
              <td style="padding: 5px 0;">${fromName}</td>
          </tr>
          <tr>
              <td style="font-weight: bold; padding: 5px 0; color: #333;">Email:</td>
              <td style="padding: 5px 0;">${userEmail}</td>
          </tr>
          <tr>
              <td style="font-weight: bold; padding: 5px 0; color: #333;">Phone Number:</td>
              <td style="padding: 5px 0;">${phone}</td>
          </tr>
          <tr>
              <td style="font-weight: bold; padding: 5px 0; color: #333;">Investment Goal:</td>
              <td style="padding: 5px 0;">${investmentGoal}</td>
          </tr>
          <tr>
              <td style="font-weight: bold; padding: 5px 0; color: #333;">Investment Experience:</td>
              <td style="padding: 5px 0;">${investmentExperience}</td>
          </tr>
          <tr>
              <td style="font-weight: bold; padding: 5px 0; color: #333;">Preferred Strategy:</td>
              <td style="padding: 5px 0;">${Array.isArray(preferredStrategy) ? preferredStrategy.join(", ") : preferredStrategy}</td>
          </tr>
          <tr>
              <td style="font-weight: bold; padding: 5px 0; color: #333;">Initial Investment Size:</td>
              <td style="padding: 5px 0;">${initialInvestmentSize}</td>
          </tr>
          <tr>
              <td style="font-weight: bold; padding: 5px 0; color: #333;">Additional Message:</td>
              <td style="padding: 5px 0;">${message.replace(/\n/g, '<br>')}</td>
          </tr>
      </table>
    `;

    // Save form data to the database
    const clientEnquiry = await ClientEnquiry.create({
      name: fromName,
      email: userEmail,
      phone_number: phone,
      investment_goal: investmentGoal,
      investment_experience: investmentExperience,
      preferred_strategy: Array.isArray(preferredStrategy) ? preferredStrategy.join(", ") : preferredStrategy,
      initial_investment_size: initialInvestmentSize,
      additional_message: message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Optionally log the email (if needed)
    Email.create({
      email: userEmail,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Define an HTML signature for the email
    const signature = `
      <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; font-family: Arial, sans-serif; font-size: 14px; color: #555;">
          <p>
              <a href="https://qodeinvest.com" target="_blank">
                  <img src="https://workspace.qodeinvest.com/files/output-onlinejpgtools.png" width="114" alt="Qode Logo" style="display: block;">
              </a>
          </p>
          <p style="margin: 0px;">M: +91 98203 00028</p>
          <p style="margin: 0px;">E: <a href="mailto:investor.relations@qodeinvest.com" style="color: #1a0dab; text-decoration: none;">investor.relations@qodeinvest.com</a></p>
          <p style="margin: 0px;">W: <a href="http://www.qodeinvest.com" style="color: #1a0dab; text-decoration: none;">www.qodeinvest.com</a></p>
          <p style="margin: 0px;">A: 2nd Floor, Tree House, Raghuvanshi Mills, Lower Parel, Mumbai-400013</p>
          <p style="margin: 0px;">Follow us:</p>
          <p>
              <a style="margin: 0px;" href="https://www.linkedin.com/company/qode1/" target="_blank">
                  <img src="https://workspace.qodeinvest.com/files/linkedin%20(1).png" alt="LinkedIn" style="width: 24px; height: 24px;">
              </a>
          </p>
      </div>
    `;

    // Send email to your operations team
    await sendMail({
      fromName: 'Qode Contact Form',
      to: 'saakshi.poddar@qodeinvest.com',
      subject: 'New Contact Form Submission',
      body: `
          <h2 style="color: #333; font-family: Arial, sans-serif;">New Contact Form Submission</h2>
          ${formattedMessage}
          ${signature}
      `
    });

    // Send a confirmation email to the user
    await sendMail({
      fromName: 'Qode Support',
      to: userEmail,
      subject: "We've Received Your Message",
      body: `
          <h2 style="color: #333; font-family: Arial, sans-serif;">Thank you for contacting Qode</h2>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <h3 style="margin-top: 15px; font-size: 16px;">Here's a copy of your message:</h3>
          ${formattedMessage}
          <p style="margin-top: 20px; font-weight: bold;">
              Best regards,<br>
              <span style="color: #000;">Qode Support Team</span>
          </p>
          ${signature}
      `
    });

    return res.status(200).json({
      message: "Your message has been sent successfully. We'll get back to you soon!",
      enquiryId: clientEnquiry.id
    });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({ 
      error: 'Failed to process your request. Please try again later.' 
    });
  }
};

module.exports = { sendGeneralMail };
