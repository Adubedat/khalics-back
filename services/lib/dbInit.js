const mysql = require('mysql');

console.log("yolo");
console.log(process.env.DB_HOST);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'khalics',
});

module.exports = connection;
