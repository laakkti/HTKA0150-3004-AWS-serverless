const {
  setAuthToken,
  requestAuthToken,
} = require("@sentinel-hub/sentinelhub-js");

const authenticate = async (clientId, clientSecret) => {
  try {
    const authToken = await requestAuthToken(clientId, clientSecret);
    
    setAuthToken(authToken);
    return authToken;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  authenticate,
};
