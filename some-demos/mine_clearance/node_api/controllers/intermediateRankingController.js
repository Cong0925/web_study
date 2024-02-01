// controllers/IntermediateRankingController.js
const intermediateRankingModel = require('../models/IntermediateRankingModel.js');
const responseHandler = require('../utils/responseHandler');

const getAllIntermediateRankings = (req, res) => {
  intermediateRankingModel.getAllIntermediateRankings((error, rankings) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }

    responseHandler.handleSuccessResponse(res, rankings);

  });
};

const getIntermediateRankingById = (req, res) => {
  const rankID = req.params.id;
  intermediateRankingModel.getIntermediateRankingById(rankID, (error, ranking) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }

    if (ranking) {
      responseHandler.handleSuccessResponse(res, ranking);

    } else {
      responseHandler.handleNotFoundResponse(res,404, 'Intermediate ranking not found');

    }
  });
};

const createIntermediateRanking = (req, res) => {
  const { resultID } = req.body;
  const data = { resultID };

  intermediateRankingModel.createIntermediateRanking(data, (error, createdRanking) => {
    if (error) {
      console.error('Error creating intermediate ranking: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }

    responseHandler.handleSuccessResponse(res, createdRanking);

  });
};

module.exports = {
  getAllIntermediateRankings,
  getIntermediateRankingById,
  createIntermediateRanking
};
