const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const idToken = event.headers.Authorization;
  const jwtPayloadBase64 = idToken.split('.')[1];
  const jwtPayload = Buffer.from(jwtPayloadBase64, 'base64').toString();
  const jwtPayloadJSON = JSON.parse(jwtPayload);
  const username = jwtPayloadJSON['cognito:username'];

  const dbParams = {
    TableName: 'users',
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': username,
    },
    Limit: 1,
  };
  dynamoDb.query(dbParams).promise().then((data) => {
    const user = data.Items[0];
    const response = {
      statusCode: 200,
      body: JSON.stringify({ user }),
    };
    callback(null, response);
  }).catch((err) => {
    callback(err);
  });
};
