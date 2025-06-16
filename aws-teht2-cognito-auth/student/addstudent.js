// Lisäys käyttäen documentclientia
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbcli, doccli } = require("./ddbconn");

/* Lisätään opiskelija. Tietotyyppien ei tarvitse olla mukana, koska
   documentclient huolehtii niistä.

   Huomaa, että käytämme name-attribuutin 
   sijasta studentname-attribuuttia, koska name on varattu sana DDB:ssä.
*/

module.exports.handler = async (event) => {
  // kantaan lisättävä opiskelija saadaan event bodystä
  const body = JSON.parse(event.body);

  const params = {
    TableName: process.env.ddb_table,
    Item: {
      studentcode: body.studentcode,
      studentname: body.studentname,
      email: body.email,
      studypoints: body.studypoints,
      grades: body.grades,
    },
  };
  
    try {
      const data = await doccli.send(new PutCommand(params));
      console.log("Success, student created", data);
      return {

        statusCode: 201,
        body: JSON.stringify(body),
      };

    } catch (err) {
      console.error(err);
    }
  
};
