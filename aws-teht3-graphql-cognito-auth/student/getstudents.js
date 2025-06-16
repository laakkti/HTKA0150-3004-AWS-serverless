const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbcli, doccli } = require("./ddbconn");

/* 
Scan-komento käy läpi eli skannaa koko DDB-taulun. Sitä kannattaa käyttää
sellaisenaan ainoastaan, jos taulussa on vain vähän dataa, esim. alle 100 itemia. 
Jos taulussa on paljon dataa, on skannaus raskas ja kallis operaatio, jolloin 
kannattaa toimia seuraavassa ohjeessa annattujen esimerkkien mukaisesti: 

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html

Skannauksen parametreissa voidaan antaa filttereitä, joilla voidaan rajata 
mitä tietoja halutaan saada. Jos annetaan vain taulun nimi, 
saadaan kaikki tiedot.
*/

const getStudents = async () => {
  const params = {
    /*
// Filtteri
FilterExpression: 'studypoints = :sp',
// Haetaan vain ne joilla on 0 opintopistettä
ExpressionAttributeValues: {
  ':sp': 0,
},
// Attribuutit jotka haetaan
ProjectionExpression: 'studentcode, email',
*/
    TableName: process.env.DDB_TABLE,
  };

  try {
    const data = await doccli.send(new ScanCommand(params));
    // Nyt kun käytetään documentclientia saadaan kannasta JS-dataa
    console.log(data.Items);
    return data.Items;
  } catch (err) {
    console.error(err);
  }
};

module.exports = getStudents;
