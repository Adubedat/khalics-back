const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  let { usernames } = event.queryStringParameters;

  // verify params ?
  usernames = JSON.parse(usernames);
  const promises = [];
  const dbParams = {
    TableName: 'users',
    KeyConditionExpression: 'username = :username',
    Limit: 1,
  };
  for (let i = 0; i < usernames.length; i += 1) {
    dbParams.ExpressionAttributeValues = { ':username': usernames[i] };
    promises.push(dynamoDb.query(dbParams).promise());
  }
  Promise.all(promises).then((data) => {
    const users = data.map((val => val.Items[0]));
    const response = {
      statusCode: 200,
      body: JSON.stringify({ users }),
    };
    callback(null, response);
  }).catch((err) => {
    callback(err);
  });
};
