const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { isString, isNumber, isArrayOfObject } = require('../../lib/fieldVerif');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const body = JSON.parse(event.body);
  const {
    description, name, exercises, restTime, set, round, reps,
  } = body;
  console.log('body:', body);
  // maybe error in prod less explicit: incorrect format
  let error;
  if (!isArrayOfObject([exercises, reps])) {
    error = Error('exercises, reps: must be an Array of Object');
  }
  if (error) {
    callback(error);
    return;
  }
  for (let i = 0; i < exercises.length; i += 1) {
    if (!isString([exercises[i].exerciseId])) {
      error = Error(`index ${i}: exercises.exerciseId must be a String`);
      break;
    } else if (!isNumber([exercises[i].repNb])) {
      error = Error(`index ${i}: exercises.repNb must be a Number`);
      break;
    }
  }
  if (error) {
    callback(error);
    return;
  }
  for (let i = 0; i < reps.length; i += 1) {
    if (!isString([reps[i].name])) {
      error = Error(`index ${i}: reps.name must be a String`);
      break;
    } else if (!isNumber([reps[i].serieNb, reps[i].repNb])) {
      error = Error(`index ${i}: reps.serieNb, reps.repNb must be a Number`);
      break;
    }
  }
  if (error) {
    callback(error);
    return;
  }
  if (!isString([description, name])) {
    error = Error('description, name, exercises.exerciseId, reps.name: must be a String');
  } else if (!isNumber([restTime, set, round])) {
    error = Error('exercises.repNb, restTime, set, round, reps.serieNb, reps.repsNb: must be a Number');
  }
  if (error) {
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
      reps,
      createdAt: timestamp,
      updatedAt: timestamp,
      startedAt: null,
      doneAt: null,
      done: false,
    },
  };
  // create user
  dynamoDb.put(params, (error, result) => { // eslint-disable-line
    if (error) {
      callback(new Error('dynamoDb put error'));
      return;
    }
    const response = { statusCode: 200 };
    callback(null, response);
  });
};
