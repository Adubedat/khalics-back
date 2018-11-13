const db = require('../../lib/dbInit');

module.exports.handler = (event, context, callback) => { // eslint-disable-line
  // TODO: verify JSON.parse return
  const body = JSON.parse(event.body);
  // TODO: verify fields
  const { pseudo, password, email } = { ...body };
  // TODO: sql injection verif
  const createUserQuery = `INSERT INTO users (pseudo, password, email) VALUES ("${pseudo}", "${password}", "${email}")`;
  // const createUserQuery = 'INSERT INTO users (pseudo, password, email) VALUES ("qqq", "dddd", "sss")';
  db.query(createUserQuery, (error, results, fields) => { // eslint-disable-line
    db.end();
    if (error) {
      callback(error, { statusCode: 400 });
    }
    callback(null, { statusCode: 200 });
  });
};
