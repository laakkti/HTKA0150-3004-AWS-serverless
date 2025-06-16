const {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} = require("@aws-sdk/client-apigatewaymanagementapi");

const sendProgress = async ({ connectionId, domainName, stage, message }) => {
  const endpoint = `https://${domainName}/${stage}`;

  const client = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint,
  });

  const command = new PostToConnectionCommand({
    ConnectionId: connectionId,
    Data: typeof message === "string" ? message : JSON.stringify(message),
  });

  try {
    await client.send(command);
  } catch (err) {
    if (err.$metadata?.httpStatusCode === 410) {
      console.warn("Stale connection:", connectionId);
    } else {
      console.error("Send error:", err);
      throw err; // rethrow so Lambda logs the failure
    }
  }
};

module.exports = sendProgress;
