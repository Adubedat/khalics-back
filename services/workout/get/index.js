const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  // const { id } = event.queryStringParameters;
  const id = '42242';
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
      if (data.Count === 0) {
        callback(new Error('inexistant workout'));
      }
      const response = {
        statusCode: 200,
        body: JSON.stringify({ data }),
      };
      callback(null, response);
    }
  });
};
