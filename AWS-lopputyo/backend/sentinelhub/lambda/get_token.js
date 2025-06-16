const { sentinelhub_authentication } = require("../request_token");

module.exports.handler = async (event) => {
  try {
    
    const authToken = await sentinelhub_authentication();        
    return authToken;
  
  } catch (error) {
    console.error("Error in the handler:", error);
    return { error: error.message };
  }
};
