const upsertGrade = async (_, { input }) => {
  const { studentcode, coursecode, grade } = input;

  // Only add study points if grade > 0
  const inc = grade > 0 ? 5 : 0;

  const params = {
    TableName: process.env.DDB_TABLE,
    Key: {
      studentcode: studentcode,
    },
    UpdateExpression: "set grades = list_append(grades, :vals) add studypoints :inc",
    ExpressionAttributeValues: {
      ":vals": [{ coursecode: coursecode, grade: grade }],
      ":inc": inc,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await doccli.send(new UpdateCommand(params));
    console.log("Success, grade added", data);
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw new Error("Failed to update grade");
  }
};

module.exports = upsertGrade;

/*
// grade-mapin lisäys grades-listaan eli upsert.
// samalla lisätään opintopisteitä, jos arvosana on > 0

const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbcli, doccli } = require("./ddbconn");

// Tämä saadaan Lambda-funktiossa eventin reittiparametrina
const scode = "t1234";
// Nämä kaksi saadaan Lambda-funktiossa eventin bodystä
const ccode = "HTS10800";
const sgrade = 5;
// Opintopisteisiin lisäys vain jos arvosana > 0
let inc = 0;
if (sgrade > 0) {
  inc = 5;
}

// Upsert tehdään list_append()-metodilla
const params = {
  TableName: process.env.DDB_TABLE,
  Key: {
    studentcode: scode,
  },
  // päivityslause
  UpdateExpression:
    "set grades = list_append(grades, :vals) add studypoints :inc",
  // listaan upsertattava data, huomaa hakasulut olion ympärillä
  ExpressionAttributeValues: {
    ":vals": [{ coursecode: ccode, grade: sgrade }],
    ":inc": inc,
  },
  // paluuarvona voidaan vastaanottaa päivitetty grades-lista
  ReturnValues: "UPDATED_NEW",
};

const upsertGrade = async (_, { input }) => {
  try {
    const data = await doccli.send(new UpdateCommand(params));
    console.log("Success, grade added", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

module.exports = upsertGrade;
*/