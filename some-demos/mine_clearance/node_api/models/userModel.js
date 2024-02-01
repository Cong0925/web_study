// models/userModel.js
const db = require('./db.js');

// 示例数据库操作函数
const getAllUsers = (offset, pageSize, callback) => {
  // 获取所有用户的逻辑
  const dataQuery = `SELECT * FROM User LIMIT ${pageSize} OFFSET ${offset}`;
  const countQuery = 'SELECT COUNT(*) AS totalUsers FROM User';

  db.query(dataQuery, (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }

    db.query(countQuery, (countError, countResults, countFields) => {
      if (countError) {
        return callback(countError, null);
      }

      const totalUsers = countResults[0].totalUsers;
      return callback(null, results, totalUsers);
    });
  });
};



const getUserById = (userId, callback) => {
  const query = 'SELECT * FROM User WHERE UserID = ?';
  db.query(query, [userId], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results[0]);
  });
};

const createUser = (user, callback) => {
  const { username, IPAddress } = user;
  const query = 'INSERT INTO User (Username, IPAddress) VALUES (?, ?)';
  db.query(query, [username, IPAddress], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    const insertedUserId = results.insertId;
    getUserById(insertedUserId, callback); // 返回新创建用户的信息
  });
};

module.exports = { getAllUsers, getUserById, createUser };
