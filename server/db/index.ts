// const mysql = require('mysql2');
import mysql from 'mysql2'
// create the connection to database
export const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  dateStrings: true,
  database: 'trc3'
});

 