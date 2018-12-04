const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { isString, isNumber, isArrayOfObject } = require('../../lib/fieldVerif');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const errorCheck = (body) => {
  const {
    description, name, exercises, restTime, set, round,
  } = body;
  let error;
  if (!isArrayOfObject([exercises])) {
    error = Error('exercises: must be an Array of Object');
  }
  if (error) { return error; }
  for (let i = 0; i < exercises.length; i += 1) {
    if (!isString([exercises[i].id])) {
      error = Error(`index ${i}: exercises.id: must be a String`);
      break;
    } else if (!isNumber([exercises[i].repNb])) {
      error = Error(`index ${i}: exercises.repNb: must be a Number`);
      break;
    }
  }
  if (error) { return error; }
  if (!isString([description, name])) {
    error = Error('description, name: must be a String');
  } else if (!isNumber([restTime, set, round])) {
    error = Error('restTime, set, round: must be a Number');
  }
  if (error) { return error; }
  return null;
};

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const body = JSON.parse(event.body);
  const {
    description, name, exercises, restTime, set, round,
  } = body;
  const error = errorCheck(body);
  if (error !== null) {
    callback(error);
    return;
  }

  const timestamp = new Date().getTime();
  const params = {
    TableName: 'workouts',
    Item: {
      _id: uuidv4(),
      description,
      name,
      exercises,
      restTime,
      set,
      round,
      createdAt: timestamp,
      updatedAt: timestamp,
      startedAt: 0,
      doneAt: 0,
      done: false,
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
