import db from '../../lib/dbInit';

module.exports.create = (event, context, callback) => { // eslint-disable-line
  console.log('--->');
  // TODO: verify JSON.parse return
  // const body = JSON.parse(event.body);
  // TODO: verify fields
  // const { pseudo, password, email } = { ...body };
  // TODO: sql injection verif
  // const createUserQuery = `INSERT INTO users (pseudo, password, email) VALUES ("${pseudo}", "${password}", "${email}")`;
  const createUserQuery = 'INSERT INTO users (pseudo, password, email) VALUES ("pseudo", "pwd", "ok@ok.fr")';
  console.log('AAAOO');
  callback(null, { statusCode: 200 });
  // db.query(createUserQuery, (error, results, fields) => { // eslint-disable-line
  //   console.log('AAA');
  //   db.end();
  //   if (error) {
  //     callback(error, { statusCode: 400 });
  //   }
  //   console.log('LOOO');
  //   callback(null, { statusCode: 200 });
  // });
};
