// mysql promise
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: 'khalics',
});

connection.connect();

// test async way
module.exports.userCreate = function (event, context, callback) { // eslint-disable-line
  const body = JSON.parse(event.body);
  const { pseudo, password, email } = { ...body };
  // const test = { pseudo: 'abc', password: 'bdc', email: 'cdc' };
  // const { pseudo, password, email } = { ...test };
  // return { statusCode: 200 };
  /* verify each field if well formated */
  // console.log(body);
  const createUserQuery = `INSERT INTO users (pseudo, password, email) VALUES ("${pseudo}", "${password}", "${email}")`;
  // const createUserQuery = 'INSERT INTO users (pseudo, password, email) VALUES ("ddd42o", "dddo42rd", "d42dd")';
  connection.query(createUserQuery, (error, results, fields) => { // eslint-disable-line
    connection.end();
    console.log('query');
    if (error) {
      console.log('error');
      callback(error, {
        statusCode: 400,
        // body: JSON.stringify({ error }),
      });
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
