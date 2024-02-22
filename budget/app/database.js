import mysql from 'mysql';

const DB = mysql.createConnection({
    host: '127.0.0.1',
    user: 'dboden',
    password: 'davbod12',
    database: 'budgetdb'
  });

export default DB;