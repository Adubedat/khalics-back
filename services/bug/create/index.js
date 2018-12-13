const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { isString } = require('../../lib/fieldVerif');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const errorCheck = (body) => {
  const {
    summary, stepsToReproduce, expectedResult, actualResult, from,
  } = body;
  let error;
  if (!isString([summary, stepsToReproduce, expectedResult, actualResult, from])) {
    error = Error('summary, stepsToReproduce, expectedResult, actualResult, from : must be a String');
  }
  if (error) { return error; }
  return null;
};

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const body = JSON.parse(event.body);
  const error = errorCheck(body);
  if (error !== null) {
    callback(error);
    return;
  }
  // TODO: summary required param
  const dbParam = {};
  ['summary', 'stepsToReproduce', 'expectedResult', 'actualResult', 'from'].forEach((val) => {
    if (body[val].length > 0) {
      dbParam[val] = body[val];
    }
  });

  const params = {
    TableName: 'bugs',
    Item: {
      _id: uuidv4(),
      ...dbParam,
    },
  };
  dynamoDb.put(params, (error, result) => { // eslint-disable-line
    if (error) {
      callback(error);
      return;
    }
    const response = { statusCode: 200 };
    callback(null, response);
  });
};
