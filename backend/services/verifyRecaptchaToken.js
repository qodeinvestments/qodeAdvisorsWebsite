const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');
const path = require('path');

/**
 * Verifies the reCAPTCHA token using reCAPTCHA Enterprise.
 *
 * @param {string} token - The token generated from the client.
 * @param {string} recaptchaAction - The expected action name.
 * @returns {Promise<number>} The risk score if valid, or throws an error.
 */
async function verifyRecaptchaToken(token, recaptchaAction = 'SUBMIT_FORM') {
  try {
    // Set the credentials path
    process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, '../config/google-credentials.json');

    // Get project ID and site key from environment variables
    const projectID = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const recaptchaKey = process.env.RECAPTCHA_SITE_KEY;

    if (!projectID || !recaptchaKey) {
      throw new Error('Missing required environment variables: GOOGLE_CLOUD_PROJECT_ID or RECAPTCHA_SITE_KEY');
    }

    // Create the reCAPTCHA Enterprise client with explicit credentials
    const client = new RecaptchaEnterpriseServiceClient();

    // Build the project path
    const projectPath = client.projectPath(projectID);

    // Build the assessment request
    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    };

    // Call createAssessment and get the response
    const [response] = await client.createAssessment(request);

    // Check if the token is valid
    if (!response.tokenProperties?.valid) {
      throw new Error(
        `The reCAPTCHA token was invalid: ${response.tokenProperties?.invalidReason || 'Unknown reason'}`
      );
    }

    // Check if the action matches
    if (response.tokenProperties.action !== recaptchaAction) {
      throw new Error(
        `Action mismatch: Expected ${recaptchaAction}, got ${response.tokenProperties.action}`
      );
    }

    // Log risk analysis details with timestamp
    const logData = {
      timestamp: new Date().toISOString(),
      score: response.riskAnalysis.score,
      action: response.tokenProperties.action,
      reasons: response.riskAnalysis.reasons || []
    };
    
    //console.log('reCAPTCHA verification result:', logData);

    return response.riskAnalysis.score;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    throw new Error(`reCAPTCHA verification failed: ${error.message}`);
  }
}

module.exports = { verifyRecaptchaToken };