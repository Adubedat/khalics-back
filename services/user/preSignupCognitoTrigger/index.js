const AWS = require('aws-sdk');

// const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  if (!event.request.userAttributes.hasOwnProperty('email')) { // eslint-disable-line
    callback(new Error('email userAttributes do not exist'));
  }
  const { email } = event.request.userAttributes;
  const dbParams = {
    TableName: 'users',
    FilterExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
    ProjectionExpression: 'email',
  };

  const onScan = (err, data) => {
    if (err) {
      callback(err);
    }
    if (data.Count === 1) {
      callback(new Error('emailExists'));
    }
    if (typeof data.LastEvaluatedKey !== 'undefined') {
      dbParams.ExclusiveStartKey = data.LastEvaluatedKey;
      dynamoDb.scan(dbParams, onScan);
    }
    callback(null, event);
  };
    // WARNING: scan can retrieve a maximum of 1MB of data
  dynamoDb.scan(dbParams, onScan);

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
};
