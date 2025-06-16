const jwt = require("jsonwebtoken");

const checkToken = async (authToken) => {
  try {
    if (authToken !== undefined) {
      const decoded = jwt.decode(authToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded && decoded.exp) {
        return decoded.exp - currentTime;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (e) {
    return 0;
  }
};

module.exports = {
  checkToken,
};