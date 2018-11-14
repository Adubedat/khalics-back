const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  // TODO: verify JSON.parse fields
  const body = JSON.parse(event.body);
  if (typeof body.pseudo !== 'string') {
    callback(new Error('pseudo must be a string'));
  }

  const timestamp = new Date().getTime();
  const params = {
    TableName: 'khalics',
    Item: {
      id: uuid.v1(),
      pseudo: 'testpseudo',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamoDb.put(params, (error, result) => { // eslint-disable-line
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create an user'));
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify('test'),
    };
    callback(null, response);
  });
};
