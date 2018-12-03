const AWS = require('aws-sdk');
const { isString } = require('../../lib/fieldVerif');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const { email } = event.request.userAttributes;
  const { userName } = event;
  const timestamp = new Date().getTime();
  if (!isString([email, userName])) {
    const error = Error('email, userName: must be a String');
    callback(error);
    return;
  }
  const params = {
    TableName: 'users',
    Item: {
      username: userName,
      email,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  // create user
  dynamoDb.put(params, (error, result) => { // eslint-disable-line
    if (error) {
      callback(error);
      return;
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
