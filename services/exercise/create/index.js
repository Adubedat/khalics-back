const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { isString, isNumber, isBoolean } = require('../../lib/fieldVerif');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const errorCheck = (body) => {
  const {
    description, name, difficultyNum, musclesInvolved, skills, isIsometric,
  } = body;
  let error;

  // TODO: verify / set skills
  if (!isString([description, name])) {
    error = Error('description, name, difficultyStr: must be a String');
  } else if (!isString(musclesInvolved)) {
    error = Error('musclesInvolved: must be an array of String');
  } else if (!isBoolean([isIsometric])) {
    error = Error('isIsometric: must be an array of Boolean');
  } else if (!isNumber([difficultyNum])) {
    error = Error('difficultyNum: must be a Number');
  }
  if (error) { return error; }
  return null;
};

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const body = JSON.parse(event.body);
  const {
    description, name, difficultyNum, musclesInvolved, skills, isIsometric,
  } = body;
  const error = errorCheck(body);
  if (error !== null) {
    callback(error);
    return;
  }

  const params = {
    TableName: 'exercises',
    Item: {
      _id: uuidv4(),
      description,
      name,
      difficultyNum,
      isIsometric,
      musclesInvolved,
      // skills,
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
