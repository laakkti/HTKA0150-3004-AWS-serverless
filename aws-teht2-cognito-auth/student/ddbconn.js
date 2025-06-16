/* Luodaan ja exportataan dynamodbclient ja documentclient -oliot
   Nämä on exportattu tässä yhdessä, vaikka kantaoperaatioita
   suorittavat tiedostot eivät tarvitse kuin jompaa kumpaa.
*/
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

// dynamodbclient-olio

// Jos käytetään kantaa oman koneen Docker-kontista
/*
const ddbcli = new DynamoDBClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local',
  },
});
*/

// Jos käytetään kantaa pilvestä eu-north-1 regionista
const ddbcli = new DynamoDBClient({ region: 'eu-north-1' });

// määritykset kun muutetaan JS-tyypit DDB-tyypeiksi
const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};
// määritykset kun muutetaan DDB-tyypit JS-tyypeiksi
const unmarshallOptions = {
  wrapNumbers: false,
};
// documentclient-olio
const doccli = DynamoDBDocumentClient.from(ddbcli, {
  marshallOptions,
  unmarshallOptions,
});
// exportataan dynamodbclient ja documentclient -oliot
module.exports = { ddbcli, doccli };
