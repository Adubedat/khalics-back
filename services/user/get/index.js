const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const { username } = event.queryStringParameters;
  const dbParams = {
    TableName: 'users',
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': username,
    },
    Limit: 1,
  };
  dynamoDb.query(dbParams, (err, data) => {
    if (err) {
      callback(err);
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify({ data }),
      };
      callback(null, response);
    }
  });
};
