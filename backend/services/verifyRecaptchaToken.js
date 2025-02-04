const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

/**
 * Verifies the reCAPTCHA token using reCAPTCHA Enterprise.
 *
 * @param {string} token - The token generated from the client.
 * @param {string} recaptchaAction - The expected action name.
 * @returns {Promise<number>} The risk score if valid, or throws an error.
 */
async function verifyRecaptchaToken(token, recaptchaAction = 'SUBMIT_FORM') {
  // Replace these with your project ID and site key
  const projectID = process.env.GOOGLE_CLOUD_PROJECT_ID || 'qode-website-1738665884540';
  const recaptchaKey = process.env.RECAPTCHA_SITE_KEY || '6Lf7VcwqAAAAAJIm0sR-zrMGipoXSoZ0TKjjovLP';

  // Create the reCAPTCHA Enterprise client.
  const client = new RecaptchaEnterpriseServiceClient();

  // Build the project path.
  const projectPath = client.projectPath(projectID);

  // Build the assessment request.
  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  // Call createAssessment and get the response.
  const [response] = await client.createAssessment(request);

  // Check if the token is valid.
  if (!response.tokenProperties || !response.tokenProperties.valid) {
    throw new Error(
      `The reCAPTCHA token was invalid: ${response.tokenProperties && response.tokenProperties.invalidReason}`
    );
  }

  // Check if the action in the token matches your expected action.
  if (response.tokenProperties.action !== recaptchaAction) {
    throw new Error("The action in the reCAPTCHA token does not match the expected action");
  }

  // Optionally log the risk analysis details.
  console.log(`The reCAPTCHA risk score is: ${response.riskAnalysis.score}`);
  if (response.riskAnalysis.reasons) {
    response.riskAnalysis.reasons.forEach((reason) => {
      console.log(reason);
    });
  }

  // Return the risk score so you can decide what to do next.
  return response.riskAnalysis.score;
}

module.exports = { verifyRecaptchaToken };
