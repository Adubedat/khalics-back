/**
 * @jest-environment node
 */
const axios = require('axios');

// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = 'https://qmzsdq8495.execute-api.eu-west-1.amazonaws.com';

test('Create workout', async () => {
  const postData = {
    description: 'TESTworkoutTESTworkoutTESTworkout',
    name: 'TESTworkout',
    exercises: [{
      id: '4242', repBySet: 12, totalSet: 3, totalRound: 0,
    },
    {
      id: '8484', repBySet: 10, totalSet: 3, totalRound: 0,
    },
    ],
    restTime: 90,
  };
  const res = await axios.post('/dev/workout/create', postData);
  expect(res.status).toEqual(200);
});
