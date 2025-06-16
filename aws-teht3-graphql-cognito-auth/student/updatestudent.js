const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbcli, doccli } = require("./ddbconn");

/* Päivitetään koko opiskelija-item. Tämä tapahtuu PutCommandilla, eli
   laitetaan uudet tiedot vanhojen päälle. Koska Primary key on mukana,
   opiskelija löydetään sen avulla.
   
   Huomaa että operaatio on aivan samanlainen kuin addstudent.
   Jos kyseistä opiskelijaa ei ole ennestään olemassa, se luodaan.
*/

/*
const params = {
  TableName: 'Students',
  Item: {
    studentcode: 't1234',
    studentname: 'Testi Opiskelija',
    email: 't1234@jamk.fi',
    studypoints: 5,
    grades: [
      {
        coursecode: 'HTS10600',
        grade: 5,
      },116
    ],
  },
};*/

const updateStudent = async (_, { input }) => {
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
    console.log("Success, student updated", data);
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = updateStudent;
