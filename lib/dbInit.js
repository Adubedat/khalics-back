import mysql from '../node_modules/mysql';

console.log('test');
console.log(process.env.dbHost);

const connection = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: 'khalics',
});

export default connection;
