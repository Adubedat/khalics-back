const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const timestamp = new Date().getTime();
  event = {};
  console.log(event);
  const params = {
    TableName: 'workouts',
    Item: {
      _id: uuidv4(),
      name: 'test1',
      description: 'desc1',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  dynamoDb.put(params, (error, result) => { // eslint-disable-line
    if (error) {
      console.error('dynamoDb put error', error);
      callback(new Error('Couldn\'t create an user'));
    }
    const response = { statusCode: 200 };
    callback(null, { response, event });
  });
};
