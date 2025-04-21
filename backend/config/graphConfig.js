// graphConfig.js
const msal = require('@azure/msal-node');
const graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        tenantId: process.env.TENANT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}` // Tenant-specific endpoint
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                //console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Info,
        }
    }
};


const msalClient = new msal.ConfidentialClientApplication(msalConfig);

// Define the token request
const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"],
    skipCache: false
};

// Get access token using client credentials
const getAccessToken = async () => {
    try {
        const result = await msalClient.acquireTokenByClientCredential(tokenRequest);
        return result.accessToken;
    } catch (error) {
        console.error('Error acquiring token:', error);
        throw error;
    }
};

const getGraphClient = async () => {
    const accessToken = await getAccessToken();
    return graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
};

module.exports = { msalClient, getGraphClient };