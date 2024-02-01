// models/AdvancedRankingModel.js
const db = require('./db.js');

const getAllAdvancedRankings = (callback) => {
  const query = 'SELECT * FROM AdvancedRanking';
  db.query(query, (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

const getAdvancedRankingById = (rankID, callback) => {
  const query = 'SELECT * FROM AdvancedRanking WHERE RankID = ?';
  db.query(query, [rankID], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback({ message: 'Advanced ranking not found' }, null);
    }
    return callback(null, results[0]);
  });
};

const createAdvancedRanking = (data, callback) => {
  const { resultID } = data;
  const query = 'INSERT INTO AdvancedRanking (ResultID) VALUES (?)';
  db.query(query, [resultID], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    const insertedRankID = results.insertId;
    getAdvancedRankingById(insertedRankID, callback); // 返回新创建的高级排名的信息
  });
};

module.exports = {
  getAllAdvancedRankings,
  getAdvancedRankingById,
  createAdvancedRanking
};
