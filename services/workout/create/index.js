const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { isString, isNumber, isArrayOfObject } = require('../../lib/fieldVerif');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const body = JSON.parse(event.body);
  const {
    description, name, exercises, restTime, set, round, reps,
  } = body;
  // maybe error in prod less explicit: incorrect format
  let error;
  if (!isArrayOfObject([exercises, reps])) {
    error = Error('exercises,reps: must be an Array of Object');
  } else if (!isString([description, name, exercises.exerciseId, reps.name])) {
    error = Error('description, name, exercises.exerciseId, reps.name: must be a String');
  } else if (!isNumber([exercises.repNb, restTime, set, round, reps.serieNb, reps.repsNb])) {
    error = Error('exercises.repNb, restTime, set, round, reps.serieNb, reps.repsNb: must be a Number');
  }
  if (error) { callback(error); }

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
