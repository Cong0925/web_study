// controllers/BeginnerRankingController.js
const beginnerRankingModel = require('../models/BeginnerRankingModel.js');
const responseHandler = require('../utils/responseHandler');

const getAllBeginnerRankings = (req, res) => {
  beginnerRankingModel.getAllBeginnerRankings((error, rankings) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }

    responseHandler.handleSuccessResponse(res, rankings);
  });
};

const getBeginnerRankingById = (req, res) => {
  const rankID = req.params.id;
  beginnerRankingModel.getBeginnerRankingById(rankID, (error, ranking) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }

    if (ranking) {
      responseHandler.handleSuccessResponse(res, ranking);
    } else {
      responseHandler.handleNotFoundResponse(res,404, 'Advanced ranking not found');
    }
  });
};

const createBeginnerRanking = (req, res) => {
  const { resultID } = req.body;
  const data = { resultID };

  beginnerRankingModel.createBeginnerRanking(data, (error, createdRanking) => {
    if (error) {
      console.error('Error creating beginner ranking: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }

    responseHandler.handleSuccessResponse(res, createdRanking);
  });
};

module.exports = {
  getAllBeginnerRankings,
  getBeginnerRankingById,
  createBeginnerRanking
};
