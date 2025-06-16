const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbcli, doccli } = require("./ddbconn");


const deleteStudent = async (_, { input }) => {
  const params = {
    TableName: process.env.DDB_TABLE,
    Key: {
      studentcode: input.studentcode,
    },
  };

  try {
    const data = await doccli.send(new DeleteCommand(params));
    console.log("Success, student deleted", data);
    return data.Attributes;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = deleteStudent;
