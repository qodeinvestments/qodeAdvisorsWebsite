// utils/signature.js
const getSignature = (fromEmail) => {
    return `
      <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; font-family: Arial, sans-serif; font-size: 14px; color: #555;">
        <p>
          <a href="https://qodeinvest.com" target="_blank">
            <img src="https://workspace.qodeinvest.com/files/output-onlinejpgtools.png" width="114" alt="Qode Logo" style="display: block;">
          </a>
        </p>
        <p style="margin: 0px;">E: <a href="mailto:${fromEmail}" style="color: #1a0dab; text-decoration: none;">${fromEmail}</a></p>
        <p style="margin: 0px;">W: <a href="http://www.qodeinvest.com" style="color: #1a0dab; text-decoration: none;">www.qodeinvest.com</a></p>
        <p style="margin: 0px;">A: 2nd Floor, Tree House, Raghuvanshi Mills, Lower Parel, Mumbai-400013</p>
        <p style="margin: 0px;">Follow us:</p>
        <p>
          <a href="https://www.linkedin.com/company/qode1/" target="_blank">
            <img src="https://workspace.qodeinvest.com/files/linkedin%20(1).png" alt="LinkedIn" style="width: 24px; height: 24px;">
          </a>
        </p>
      </div>
    `;
  };
  
  module.exports = { getSignature };
  