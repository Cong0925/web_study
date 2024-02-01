// models/IntermediateRankingModel.js
const db = require('./db.js');

const getAllIntermediateRankings = (callback) => {
  const query = 'SELECT * FROM IntermediateRanking';
  db.query(query, (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

const getIntermediateRankingById = (rankID, callback) => {
  const query = 'SELECT * FROM IntermediateRanking WHERE RankID = ?';
  db.query(query, [rankID], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback({ message: 'Intermediate ranking not found' }, null);
    }
    return callback(null, results[0]);
  });
};

const createIntermediateRanking = (data, callback) => {
  const { resultID } = data;
  const query = 'INSERT INTO IntermediateRanking (ResultID) VALUES (?)';
  db.query(query, [resultID], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    const insertedRankID = results.insertId;
    getIntermediateRankingById(insertedRankID, callback); // 返回新创建的中级排名的信息
  });
};

module.exports = {
  getAllIntermediateRankings,
  getIntermediateRankingById,
  createIntermediateRanking
};
