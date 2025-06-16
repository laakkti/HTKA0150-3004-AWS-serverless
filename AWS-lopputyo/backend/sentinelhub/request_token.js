const AWS = require("aws-sdk");
const { authenticate } = require("./authenticate");
require('dotenv').config();
const { checkToken } = require("./checkToken");


//const { getSentinelHubCredentials } = require("./getSentinelHubCredentials");


const ssm = new AWS.SSM({ region: "eu-north-1" }); // Adjust region if necessary


// Function to invoke get_sentinelhub_token (which calls authenticate to get a new token)
async function getSentinelHubToken() {
      
  try {
    const clientId = process.env.sentinelHubClientId;
    const clientSecret = process.env.sentinelHubClientSecret;
/*    const {
      sentinelHubClientId,
      sentinelHubClientSecret,
    } = await getSentinelHubCredentials();

    console.log("Client ID:", sentinelHubClientId);
    console.log("Client SECRET:", sentinelHubClientSecret);
*/
    const token = await authenticate(clientId, clientSecret);
    console.log("Token received:", token);
    return token; // Return the new token
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw new Error("Failed to get new token: " + error.message);
  }
}

// Function to get the saved token from SSM (or any other storage method you prefer)
async function getTokenFromStore() {
  const params = {
    Name: "sentinelhub_token",  // The name of the parameter where the token is saved
    WithDecryption: true
  };

  try {
    const data = await ssm.getParameter(params).promise();
    return JSON.parse(data.Parameter.Value);  // Assume the token is stored as a JSON string
  } catch (error) {
    console.error("Error retrieving token from SSM:", error);
    return null;
  }
}

// Function to save the token to SSM
async function saveTokenToStore(tokenData) {
  const params = {
    Name: "sentinelhub_token",  // The name of the parameter where the token will be stored
    Value: JSON.stringify(tokenData),  // Store the token as a JSON string
    Type: "String",  // Change to SecureString if necessary
    Overwrite: true
  };

  try {
    await ssm.putParameter(params).promise();
    console.log("Token saved successfully.");
  } catch (error) {
    console.error("Error saving token to SSM:", error);
  }
}


const sentinelhub_authentication = async () => {

  try {
    // Check for an existing token
    let tokenData = await getTokenFromStore();
    if (!tokenData) {
      console.log("No token found, fetching new token...");
      tokenData = await getSentinelHubToken();  // Fetch a new token
      await saveTokenToStore(tokenData);  // Save the new token to SSM
      return tokenData;
    }

     const expTime = await checkToken(tokenData);
     console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx expiration time: ", expTime);
     if (expTime <= 600) {       
       tokenData = await getSentinelHubToken();  // Fetch a new token
       await saveTokenToStore(tokenData);  // Save the new token to SSM
     }
   
    return tokenData;
  } catch (error) {
    console.error("Error in the handler:", error);
    return { error: error.message };
  }
};

module.exports = {
  sentinelhub_authentication
};
