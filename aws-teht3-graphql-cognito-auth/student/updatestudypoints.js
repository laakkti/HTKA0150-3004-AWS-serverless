const { UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { ddbcli, doccli } = require('./ddbconn');

/* Päivitetään opiskelijan opintopisteet arvoon 10.
   DynamoDB:n "kyselyjä" kutsutaan nimellä expression
   https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.html
*/


const updateStudypoints = async (_, { input }) => {
  const params = {
    TableName: process.env.DDB_TABLE,
    Key: {
      'studentcode': input.studentcode,  // Studentcode from GraphQL input
    },
    UpdateExpression: 'set studypoints = :sp',  // Update the studypoints attribute
    ExpressionAttributeValues: {
      ':sp': input.sp,  // Value for studypoints
    },
  };

  try {
    // Execute the update in DynamoDB
    const data = await doccli.send(new UpdateCommand(params));
    console.log('Success, studypoints updated', data);
    return 'Studypoints updated successfully';  // Success message
  } catch (err) {
    console.error('Error updating studypoints', err);
    return `Error updating studypoints: ${err.message || err}`;
  }
};

// Export the resolver under the Mutation type
module.exports = updateStudypoints;