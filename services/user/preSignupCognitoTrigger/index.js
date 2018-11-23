const AWS = require('aws-sdk');

// const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  if (event.request.userAttributes.hasOwnProperty('email')) { // eslint-disable-line
  const { email, username } = event.request.userAttributes;

  const username = 'Google_100624641438488386206';
  const dbParams = {
    TableName: 'users',
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': `${username} + a`,
    },
    ProjectionExpression: 'email',
    Limit: 1,
  };

  dynamoDb.query(dbParams, (err, data) => {
    if (err) {
      callback(err);
    } else {
      if (data.count === 0) {
        callback(new Error('emailExists'));
      }
      callback(null, event);
    }
  });

  // const idpParam = {
  //   UserPoolId: event.userPoolId,
  //   Filter: `email = "${email}"`,
  // };
  // cognitoIdp.listUsers(idpParam).promise()
  //   .then((results) => {
  //     const { userName } = event;
  //     // if usernames are the same dont raise error to let cognito handle it
  //     if (results.Users.length > 0 && results.Users[0].Username !== userName) {
  //       callback(new Error('emailExists'));
  //     }
  //     callback(null, event);
  //   })
  //   .catch((error) => {
  //     callback(error);
  //   });
  // }
};
