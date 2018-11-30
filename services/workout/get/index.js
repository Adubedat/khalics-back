const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const { ids } = event.queryStringParameters;

  const promises = [];
  const dbParams = {
    TableName: 'workouts',
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': '_id',
    },
    Limit: 1,
  };
  for (let i = 0; i < ids.length; i += 1) {
    dbParams.ExpressionAttributeValues = { ':id': ids[i] };
    promises.push(dynamoDb.query(dbParams).promise());
  }
  Promise.all(promises).then((data) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
    callback(null, response);
  }).catch((err) => {
    callback(err);
  });
};
