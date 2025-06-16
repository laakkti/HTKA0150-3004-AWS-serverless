const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbcli, doccli } = require("./ddbconn");

const addStudent = async (_, { input }) => {
  console.log("Received input:", input);
  console.log("Using table:", process.env.DDB_TABLE);

  const params = {
    TableName: process.env.DDB_TABLE,
    Item: {
      studentcode: input.studentcode,
      studentname: input.studentname,
      email: input.email,
      studypoints: input.studypoints,
      grades: input.grades,
    },
  };

  try {
    const data = await doccli.send(new PutCommand(params));
    console.log("Success, student created", data);

    return {
      studentcode: input.studentcode,
      studentname: input.studentname,
      email: input.email,
      studypoints: input.studypoints,
      grades: input.grades,
    };
  } catch (err) {
    console.error("DynamoDB Error:", err);
    throw new Error(`Failed to add student: ${err.message}`);
  }
};

module.exports = addStudent;