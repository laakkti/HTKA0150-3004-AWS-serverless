const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const region = process.env.AWS_REGION;
const userPoolId = process.env.user_pool_id;
const clientId = process.env.client_id;

const client = jwksClient({
  jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

exports.handler = async (event) => {
  const token = event.queryStringParameters?.token;

  if (!token) {
    console.log("Missing token");
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getKey,
        {
          issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
          algorithms: ["RS256"],
          audience: clientId,
        },
        (err, decoded) => (err ? reject(err) : resolve(decoded))
      );
    });

    console.log("Connected user:", decoded.sub, decoded.email);
    
    return {
      statusCode: 200,
      body: "Connected",
    };
  } catch (err) {
    console.error("Token validation failed:", err);
    return {
      statusCode: 403,
      body: "Forbidden",
    };
  }
};
