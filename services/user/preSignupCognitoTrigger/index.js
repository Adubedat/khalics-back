const AWS = require('aws-sdk');

const cognitoIdp = new AWS.CognitoIdentityServiceProvider();

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
};
