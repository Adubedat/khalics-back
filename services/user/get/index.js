const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const { username } = event.queryStringParameters;

  // verify params ? username is taken from JWTtoken / Cognito ?
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
