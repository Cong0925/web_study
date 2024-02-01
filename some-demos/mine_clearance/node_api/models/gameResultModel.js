// 假设你的数据库交互逻辑在这里
const db = require('./db.js');

// 示例数据库操作函数
const getAllGameResults = (callback) => {
  // 获取所有游戏结果的逻辑
  const query = 'SELECT * FROM GameResult';
  db.query(query, (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

const getGameResultByUserId = (userID, callback) => {
  // 根据用户ID获取游戏结果的逻辑
  const query = 'SELECT * FROM GameResult WHERE UserID = ?';
  db.query(query, [userID], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback({ message: 'Game result not found' }, null);
    }
    return callback(null, results);
  });
};

const getGameResultByResultId = (resultID, callback) => {
  const query = 'SELECT * FROM GameResult WHERE ResultID = ?';
  db.query(query, [resultID], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback({ message: 'Game result not found' }, null);
    }
    return callback(null, results);
  });
};

const createGameResult = (data, callback) => {
  // 创建游戏结果的逻辑
  const { userID, challengeTime, creationDate, difficulty } = data;
  const query = 'INSERT INTO GameResult (UserID, ChallengeTime, CreationDate, Difficulty) VALUES (?, ?, ?, ?)';
  db.query(query, [userID, challengeTime, creationDate, difficulty], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    const insertedResultID = results.insertId;
    getGameResultByResultId(insertedResultID, callback); // 返回新创建游戏结果的信息
  });
};

module.exports = {
  getAllGameResults,
  getGameResultByUserId,
  getGameResultByResultId,
  createGameResult
};
