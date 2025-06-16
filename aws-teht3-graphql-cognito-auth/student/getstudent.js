const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbcli, doccli } = require("./ddbconn");


const getStudent = async (_, { input }) => {
  const params = {
    TableName: process.env.DDB_TABLE,
    Key: {
      studentcode: input.studentcode,
    },
  };

  try {
    const data = await doccli.send(new GetCommand(params));
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx",data.Item);
    console.log("äääääääääääääääääää",params);
    return data.Item || null;
  } catch (err) {
    console.error(err);
  }
};

module.exports = getStudent;
