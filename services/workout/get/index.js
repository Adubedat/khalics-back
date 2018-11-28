const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const { id } = event.queryStringParameters;
  if (!id) {
    callback(new Error('workout id inexistant'));
  }
  const dbParams = {
    TableName: 'workouts',
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': '_id',
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':id': id,
    },
    ProjectionExpression: '#name, description',
    Limit: 1,
  };
  dynamoDb.query(dbParams, (err, data) => {
    if (err) {
      callback(err);
    } else {
      if (data.count === 0) {
        callback(new Error('inexistant workout'));
      }
      callback(null, { body: JSON.stringify({ data }) });
    }
  });
};
