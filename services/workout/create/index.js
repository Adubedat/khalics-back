const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { isString, isNumber } = require('../../lib/fieldVerif');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  const body = JSON.parse(event.body);
  const {
    description, name, exercises, restTime, set, round, reps,
  } = body;
  // if (!isString([description, name, exercises.exerciseId, reps.name]))
  // const isNumber = [restTime, name].every(val => typeof val === 'number');
  if (!isString([description, name])) {
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
      // exercises,
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
