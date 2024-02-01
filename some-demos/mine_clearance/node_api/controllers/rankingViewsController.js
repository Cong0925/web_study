// controllers/beginnerRankingController.js
const rankingViewsModel = require('../models/rankingViewsModel');
const responseHandler = require('../utils/responseHandler');

const getAllRankingsView = (req, res, getAllRankingsFunction) => {
  // 从请求中获取页码和每页的数量，默认为第一页，每页显示 10 条记录
  const page = req.query.Page || 1;
  const pageSize = req.query.Size || 10;

  // 计算 OFFSET，以便在查询时跳过相应的记录
  const offset = (page - 1) * pageSize;

  getAllRankingsFunction(offset, pageSize, (results, totalCount) => {
    responseHandler.handleSuccessResponse(res, results, totalCount);
  });
};

const getAllBeginnerRankingsView = (req, res) => {
  getAllRankingsView(req, res, rankingViewsModel.getAllBeginnerRankingsView);
};

const getAllIntermediateRankingsView = (req, res) => {
  getAllRankingsView(req, res, rankingViewsModel.getAllIntermediateRankingsView);
};

const getAllAdvancedRankingsView = (req, res) => {
  getAllRankingsView(req, res, rankingViewsModel.getAllAdvancedRankingsView);
};


const getAllRankingsViewByUserId = (req, res, getAllRankingsFunctionByUserId) => {
  // 从请求中获取页码和每页的数量，默认为第一页，每页显示 10 条记录
  const page = req.query.Page || 1;
  const pageSize = req.query.Size || 10;

  // 计算 OFFSET，以便在查询时跳过相应的记录
  const offset = (page - 1) * pageSize;
  const userId = req.params.id;

  getAllRankingsFunctionByUserId(userId, offset, pageSize, (results, totalCount) => {
    responseHandler.handleSuccessResponse(res, results, totalCount);
  });
};

const getAllBeginnerRankingsViewByUserId = (req, res) => {
  getAllRankingsViewByUserId(req, res, rankingViewsModel.getAllBeginnerRankingsViewByUserId);
};

const getAllIntermediateRankingsViewByUserId = (req, res) => {
  getAllRankingsViewByUserId(req, res, rankingViewsModel.getAllIntermediateRankingsViewByUserId);
};

const getAllAdvancedRankingsViewByUserId = (req, res) => {
  getAllRankingsViewByUserId(req, res, rankingViewsModel.getAllAdvancedRankingsViewByUserId);
};



module.exports = {
  getAllBeginnerRankingsView,
  getAllBeginnerRankingsViewByUserId,
  getAllIntermediateRankingsView,
  getAllIntermediateRankingsViewByUserId,
  getAllAdvancedRankingsView,
  getAllAdvancedRankingsViewByUserId
};