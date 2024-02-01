// models/beginnerRankingModel.js
const db = require('./db.js');

const getAllRankingsView = (tableName, offset, pageSize, callback) => {
  // 将 pageSize 和 offset 转换为数字
  const numericPageSize = parseInt(pageSize, 10);
  const numericOffset = parseInt(offset, 10);

  // 查询获取所需页面的数据
  const dataQuery = `SELECT * FROM ${tableName} ORDER BY ChallengeTime ASC LIMIT ${numericPageSize} OFFSET ${numericOffset}`;

  db.query(dataQuery, (error, results, fields) => {
    if (error) throw error;

    // 查询获取总行数
    const countQuery = `SELECT COUNT(*) AS totalRows FROM ${tableName}`;
    db.query(countQuery, (countError, countResults, countFields) => {
      if (countError) throw countError;

      const totalRows = countResults[0].totalRows;

      // 将结果传递给回调函数
      callback(results, totalRows);
    });
  });
};


const getAllBeginnerRankingsView = (offset, pageSize, callback) => {
  getAllRankingsView('BeginnerRankingView', offset, pageSize, callback);
};

const getAllIntermediateRankingsView = (offset, pageSize, callback) => {
  getAllRankingsView('IntermediateRankingView', offset, pageSize, callback);
};

const getAllAdvancedRankingsView = (offset, pageSize, callback) => {
  getAllRankingsView('AdvancedRankingView', offset, pageSize, callback);
};


const getAllRankingsViewByUserId = (tableName, userId, offset, pageSize, callback) => {
  // 将 pageSize 和 offset 转换为数字
  const numericPageSize = parseInt(pageSize, 10);
  const numericOffset = parseInt(offset, 10);

  // 查询获取符合条件的页面数据
  const dataQuery = `SELECT RankID, UserID, Username, ChallengeTime, CreationDate, UserRank FROM ${tableName} WHERE UserID = ? ORDER BY ChallengeTime ASC LIMIT ? OFFSET ?`;

  db.query(dataQuery, [userId, numericPageSize, numericOffset], (error, results, fields) => {
    if (error) throw error;

    // 查询获取符合条件的总行数
    const countQuery = `SELECT COUNT(*) AS totalRows FROM ${tableName} WHERE UserID = ?`;
    db.query(countQuery, [userId], (countError, countResults, countFields) => {
      if (countError) throw countError;

      const totalRows = countResults[0].totalRows;

      // 将结果传递给回调函数
      callback(results, totalRows);
    });
  });
};


const getAllBeginnerRankingsViewByUserId = (userId, offset, pageSize, callback) => {
  getAllRankingsViewByUserId('BeginnerRankingView', userId, offset, pageSize, callback);
};

const getAllIntermediateRankingsViewByUserId = (userId, offset, pageSize, callback) => {
  getAllRankingsViewByUserId('IntermediateRankingView', userId, offset, pageSize, callback);
};

const getAllAdvancedRankingsViewByUserId = (userId, offset, pageSize, callback) => {
  getAllRankingsViewByUserId('AdvancedRankingView', userId, offset, pageSize, callback);
};





module.exports = {
  getAllBeginnerRankingsView,
  getAllBeginnerRankingsViewByUserId,
  getAllIntermediateRankingsView,
  getAllIntermediateRankingsViewByUserId,
  getAllAdvancedRankingsView,
  getAllAdvancedRankingsViewByUserId
};
