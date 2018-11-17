const AWS = require('aws-sdk');

const cognitoIdp = new AWS.CognitoIdentityServiceProvider();

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  if (event.request.userAttributes.hasOwnProperty('email')) { // eslint-disable-line
    const { email } = event.request.userAttributes;
    const params = {
      UserPoolId: event.userPoolId,
      Filter: `email = "${email}"`,
    };

    cognitoIdp.listUsers(params).promise()
      .then((results) => {
        const { userName } = event;
        // if usernames are the same dont raise error to let cognito handle it
        if (results.Users.length > 0 && results.Users[0].Username !== userName) {
          callback(new Error('emailExists'));
        }
        callback(null, event);
      })
      .catch((error) => {
        callback(error);
      });
  }

  // Below in another lambda func
  // On PostConfirmation_ConfirmSignUp trigger (may not be necessary)
  // Useless to have user in database if not confirmed (it's already in cognito)
  //
  // const timestamp = new Date().getTime();
  // const params = {
  //   TableName: 'users',
  //   Item: {
  //     username: userName,
  //     email,
  //     createdAt: timestamp,
  //     updatedAt: timestamp,
  //   },
  // };
  //
  // dynamoDb.put(params, (error, result) => { // eslint-disable-line
  //   if (error) {
  //     console.error('dynamoDb put error', error);
  //     callback(new Error('Couldn\'t create an user'));
  //   }
  //   let response;
  //   if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
  //     response = event;
  //   } else {
  //     response = { statusCode: 200 };
  //   }
  //   callback(null, response);
  // });
};
