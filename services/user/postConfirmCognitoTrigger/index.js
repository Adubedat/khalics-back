const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const { email } = event.request.userAttributes;
  const { userName } = event;
  const timestamp = new Date().getTime();
  const params = {
    TableName: 'users',
    Item: {
      username: userName,
      email,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  dynamoDb.put(params, (error, result) => { // eslint-disable-line
    if (error) {
      console.error('dynamoDb put error', error);
      callback(new Error('Couldn\'t create an user'));
    }
    let response;
    if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
      response = event;
    } else {
      response = { statusCode: 200 };
    }
    callback(null, response);
  });
};
