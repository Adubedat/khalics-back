const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { isString, isNumber, isObject } = require('../../lib/fieldVerif');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const body = JSON.parse(event.body);
  const {
    description, name, exercises, restTime, set, round, reps,
  } = body;
  if (!isObject([exercises, reps])
      || !isString([description, name, exercises.exerciseId, reps.name])
      || !isNumber([exercises.repNb, restTime, set, round, reps.serieNb, reps.repsNb])) {
    console.error('notString');
  }

  const timestamp = new Date().getTime();
  console.log(description, typeof description);
  const params = {
    TableName: 'workouts',
    Item: {
      _id: uuidv4(),
      description,
      name,
      exercises,
      // restTime,
      // set,
      // round,
      // reps,
      // createdAt: timestamp,
      // updatedAt: timestamp,
      // startedAt: null,
      // doneAt: null,
      // done: false,
    },
  };
  // create user
  dynamoDb.put(params, (error, result) => { // eslint-disable-line
    if (error) {
      console.error('dynamoDb put error', error);
      callback(new Error('Couldn\'t create an user'));
      return;
    }
    console.log('test');
    const response = { statusCode: 200 };
    callback(null, response);
  });
};
