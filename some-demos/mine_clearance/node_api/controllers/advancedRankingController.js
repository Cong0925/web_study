// controllers/AdvancedRankingController.js
const advancedRankingModel = require('../models/AdvancedRankingModel.js');
const responseHandler = require('../utils/responseHandler');

const getAllAdvancedRankings = (req, res) => {
  advancedRankingModel.getAllAdvancedRankings((error, rankings) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }

     responseHandler.handleSuccessResponse(res, rankings);
  });
};

const getAdvancedRankingById = (req, res) => {
  const rankID = req.params.id;
  advancedRankingModel.getAdvancedRankingById(rankID, (error, ranking) => {
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

const createAdvancedRanking = (req, res) => {
  const { resultID } = req.body;
  const data = { resultID };

  advancedRankingModel.createAdvancedRanking(data, (error, createdRanking) => {
    if (error) {
      console.error('Error creating advanced ranking: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }

    responseHandler.handleSuccessResponse(res, createdRanking);

  });
};

module.exports = {
  getAllAdvancedRankings,
  getAdvancedRankingById,
  createAdvancedRanking
};
