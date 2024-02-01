const gameResultModel = require('../models/gameResultModel.js');
const responseHandler = require('../utils/responseHandler');


// 示例数据库操作函数
const getAllGameResults = (req, res) => {
  // 获取所有游戏结果的逻辑
  gameResultModel.getAllGameResults((error, results) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      responseHandler.handleNotFoundResponse(res, 500, 'Internal Server Error');
      return;
    }
    if (results) {
      responseHandler.handleSuccessResponse(res, results);
    } else {
      responseHandler.handleNotFoundResponse(res, 404, 'results not found');
    }
  })
};

const getGameResultByUserId = (req, res) => {
  // 根据用户ID获取游戏结果的逻辑
  const userId = req.params.id;
  gameResultModel.getGameResultByUserId(userId, (error, results) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      responseHandler.handleNotFoundResponse(res, 500, 'Internal Server Error');
      return;
    }

    if (results) {
      responseHandler.handleSuccessResponse(res, results);
    } else {
      responseHandler.handleNotFoundResponse(res, 404, 'results not found');
    }
  });
};

const createGameResult = (req, res) => {
  const { userID, challengeTime, difficulty } = req.body;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const creationDate = `${year}-${month}-${day}`;
  const data = { userID, challengeTime, creationDate, difficulty };

  // 打印数据到控制台
  console.log('Data to be inserted:', data);
  gameResultModel.createGameResult(data, (error, createdResult) => {
    if (error) {
      console.error('Error creating game result: ' + error.stack);
      responseHandler.handleNotFoundResponse(res, 500, 'Internal Server Error');
      return;
    }

    responseHandler.handleSuccessResponse(res, createdResult);

  });
};

module.exports = {
  getAllGameResults,
  getGameResultByUserId,
  createGameResult
};
