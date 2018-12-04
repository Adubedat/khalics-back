const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  let { ids } = event.queryStringParameters;

  ids = JSON.parse(ids);
  const promises = [];
  const dbParams = {
    TableName: 'exercises',
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
    const exercises = data.map((val => val.Items[0]));
    const response = {
      statusCode: 200,
      body: JSON.stringify({ exercises }),
    };
    callback(null, response);
  }).catch((err) => {
    callback(err);
  });
};
