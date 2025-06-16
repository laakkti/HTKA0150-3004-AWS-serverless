// DDB-kannan käsittelymetodit tulevat AWS SDK:sta
const AWS = require("aws-sdk");

/*
Clientilta lähetetään 
    {
        "name": "laakkti",
        "email": "AA4598@student.jamk.fi"
    }
*/

module.exports.createCustomer = async (event) => {
  const body = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      primary_key: body.name,
      email: body.email,
    },
  };
  await dynamoDb.put(putParams).promise();
  return {
    statusCode: 201,
  };
};
