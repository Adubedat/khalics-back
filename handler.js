// mysql promise
const mysql = require('mysql');

// db file
const connection = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: 'khalics',
});

connection.connect();

// test async way
module.exports.userCreate = function (event, context, callback) { // eslint-disable-line
  // verify parse error
  // const body = JSON.parse(event.body);
  // const { pseudo, password, email } = { ...body };
  const test = { pseudo: 'a', password: 'b', email: 'c' };
  const { pseudo, password, email } = { ...test };
  // return { statusCode: 200 };
  /* verify each field if well formated */
  const createUserQuery = `INSERT INTO users (pseudo, password, email) VALUES ("${pseudo}", "${password}", "${email}")`;
  connection.query(createUserQuery, (error, results, fields) => { // eslint-disable-line
    if (error) {
      callback(error, {
        statusCode: 400,
        // body: JSON.stringify({ error }),
      });
    }
    callback(null, { statusCode: 200 });
  });
};

// module.exports.test = async (event, context) => ({
//   statusCode: 200,
//   body: JSON.stringify({
//     message: 'resized your image !',
//     envTest: `env:${process.env.TEST_API_KEY} - ${process.env.GOOGLE_MAPS_API_KEY}`,
//   }),
// });
