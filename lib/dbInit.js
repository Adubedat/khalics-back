import mysql from '../node_modules/mysql';

process.env.STAGE = 'dev'; // TODO: use real env
const env = require(`../${process.env.STAGE}.env.json`); // eslint-disable-line

const connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: 'khalics',
});

export default connection;
