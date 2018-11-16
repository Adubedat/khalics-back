const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  console.log('------>', event);
  const { userName } = event;
  const { email } = event.request.userAttributes;
  const timestamp = new Date().getTime();
  const params = {
    TableName: 'users',
    Item: {
      id: uuid.v1(),
      userName,
      email,
      confirmed: false, // confirmed will be set to true in post confirmation trigger
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  console.log('===>', params);

  dynamoDb.put(params, (error, result) => { // eslint-disable-line
    if (error) {
      console.error('=============>', error);
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
