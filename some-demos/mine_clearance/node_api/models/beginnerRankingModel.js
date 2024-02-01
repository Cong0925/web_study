// models/BeginnerRankingModel.js
const db = require('./db.js');

const getAllBeginnerRankings = (callback) => {
  const query = 'SELECT * FROM BeginnerRanking';
  db.query(query, (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

const getBeginnerRankingById = (rankID, callback) => {
  const query = 'SELECT * FROM BeginnerRanking WHERE RankID = ?';
  db.query(query, [rankID], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback({ message: 'Beginner ranking not found' }, null);
    }
    return callback(null, results[0]);
  });
};

const createBeginnerRanking = (data, callback) => {
  const { resultID } = data;
  const query = 'INSERT INTO BeginnerRanking (ResultID) VALUES (?)';
  db.query(query, [resultID], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    const insertedRankID = results.insertId;
    getBeginnerRankingById(insertedRankID, callback); // 返回新创建的初级排名的信息
  });
};

module.exports = {
  getAllBeginnerRankings,
  getBeginnerRankingById,
  createBeginnerRanking
};
