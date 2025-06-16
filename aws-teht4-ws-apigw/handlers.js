import {
  QueryCommand,
  PutCommand,
  DeleteCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { doccli } from "./ddbconn.js";

const CONNECTION_DB_TABLE = process.env.CONNECTION_DB_TABLE;

export const sendmessageHandler = async (event, context, callback) => {
  console.log("SendMessage");

  const agma = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
  });

  const msg = JSON.parse(event.body).data;
  const connectionId = event.requestContext.connectionId;
  console.log("data", msg, "connectionId", connectionId);

  try {
    // Check if roomId is already associated with this connectionId
    const scanResult = await doccli.send(
      new ScanCommand({
        TableName: CONNECTION_DB_TABLE,
        ProjectionExpression: "roomId, connectionId",
        FilterExpression: "connectionId = :cid",
        ExpressionAttributeValues: { ":cid": connectionId },
      })
    );

    if (!scanResult.Items.length) {
      console.error("No roomId found for connectionId", connectionId);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({ error: "You must join a room first" }),
      });
    }

    const roomId = scanResult.Items[0].roomId;
    console.log("roomId", roomId);

    // Retrieve all connections for the room
    const queryResult = await doccli.send(
      new QueryCommand({
        TableName: CONNECTION_DB_TABLE,
        ProjectionExpression: "roomId, connectionId",
        KeyConditionExpression: "roomId = :rid",
        ExpressionAttributeValues: { ":rid": roomId },
      })
    );

    // Send message to all connections in the room
    await Promise.all(
      queryResult.Items.map(async ({ connectionId }) => {
        try {
          console.log("xxxxxxxxxxxxxxxxxxxxx ",msg);
          await agma.send(
            new PostToConnectionCommand({
              ConnectionId: connectionId,
              Data: msg,
            })
          );
        } catch (e) {
          if (e.statusCode === 410) {
            console.log(`Stale connection, deleting ${connectionId}`);
            await doccli.send(
              new DeleteCommand({
                TableName: CONNECTION_DB_TABLE,
                Key: { roomId, connectionId },
              })
            );
          } else {
            console.error("PostToConnection failed", e);
          }
        }
      })
    );
  } catch (e) {
    console.error("Error in sendmessageHandler", e);
    return callback(null, { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) });
  }

  return callback(null, { statusCode: 200, body: "" });
};

// TSEKKAAA cloudWatchilla console.logeja 
export async function enterroomHandler(event, context, callback) {
  try {
    const roomId = JSON.parse(event.body).data;
    if (!roomId) {
      console.error("No roomId provided");
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({ error: "Room ID is required" }),
      });
    }

    await doccli.send(
      new PutCommand({
        TableName: CONNECTION_DB_TABLE,
        Item: {
          roomId: roomId,
          connectionId: event.requestContext.connectionId,
        },
      })
    );
    console.log(`User entered room: ${roomId}`);

    
    
    //console.log(message);

     //Send message before calling callback
    // ei toimi
    //await sendMessage(roomId, "xxxxxxxxmessage");
    //callback(null, { statusCode: 200, body: "" });
    const message = `User entered room: ${roomId}`;
    return { statusCode: 200, body: JSON.stringify({ message }) };


  } catch (err) {
    console.error("Error in enterroomHandler", err);
    return callback(null, { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) });
  }

  //callback(null, { statusCode: 200, body: "" });
}

export async function exitroomHandler(event, context, callback) {
  try {
    const roomId = JSON.parse(event.body).data;
    if (!roomId) {
      console.error("No roomId provided");
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({ error: "Room ID is required" }),
      });
    }

    await doccli.send(
      new DeleteCommand({
        TableName: CONNECTION_DB_TABLE,
        Key: {
          roomId: roomId,
          connectionId: event.requestContext.connectionId,
        },
      })
    );
    console.log(`User exited room: ${roomId}`);
  } catch (err) {
    console.error("Error in exitroomHandler", err);
    return callback(null, { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) });
  }

  const message = `User exited room: ${roomId}`;
    //console.log(message);

    // Send message before calling callback
    //await sendMessage(roomId, message);
  //callback(null, { statusCode: 200, body: "" });
  return { statusCode: 200, body: JSON.stringify({ message }) };
}

export async function auth(event, context, callback) {
  console.log("Authorized");

  if ((event.queryStringParameters || {}).Auth === process.env.AUTHTOKEN) {
    return callback(null, {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [{ Action: "execute-api:Invoke", Effect: "Allow", Resource: event.methodArn }],
      },
    });
  }

  console.log("Unauthorized");
  callback(null, { statusCode: 401, body: "Unauthorized" });
}

export function connectHandler(event, context, callback) {
  console.log("OnConnect");
  callback(null, { statusCode: 200, body: "" });
}

export function disconnectHandler(event, context, callback) {
  console.log("OnDisconnect");
  callback(null, { statusCode: 200, body: "" });
}

export function defaultHandler(event, context, callback) {
  callback(null, { statusCode: 404, body: "No event found" });
}
