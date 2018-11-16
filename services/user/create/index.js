const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const { username } = event;
  const { email } = event.userAttributes;
  const timestamp = new Date().getTime();
  const params = {
    TableName: 'khalics',
    Item: {
      id: uuid.v1(),
      username,
      email,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamoDb.put(params, (error, result) => { // eslint-disable-line
    if (error) {
      callback(new Error('Couldn\'t create an user'));
    }
    let response;
    if (event.triggerSource === 'PreSignUp_SignUp') {
      response = event;
    } else {
      response = { statusCode: 200 };
    }
    callback(null, response);
  });
};
