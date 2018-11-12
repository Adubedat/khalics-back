// mysql promise
const mysql = require('mysql');

// TODO: make a file with db conncetion
const connection = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: 'khalics',
});

connection.connect();

module.exports.userCreate = (event, context, callback) => { // eslint-disable-line
  // TODO: verify JSON.parse return
  const body = JSON.parse(event.body);
  // TODO: verify fields
  const { pseudo, password, email } = { ...body };
  const createUserQuery = `INSERT INTO users (pseudo, password, email) VALUES ("${pseudo}", "${password}", "${email}")`;
  connection.query(createUserQuery, (error, results, fields) => { // eslint-disable-line
    connection.end();
    if (error) {
      callback(error, { statusCode: 400 });
    }
    callback(null, { statusCode: 200 });
  });
};

module.exports.test = (event, context, callback) => {
  const ret = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'resized your image !',
    }),
  };
  callback(null, ret);
};
