// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mine_clearance'
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database with threadId: ' + connection.threadId);
});

// 添加一个测试查询
connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;

  console.log('Database connection test successful. Result: ', results[0].solution);
});


module.exports = connection;
