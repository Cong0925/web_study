// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const gameResultRoutes = require('./gameResultRoutes');
const beginnerRankingRoutes = require('./beginnerRankingRoutes');
const intermediateRankingRoutes = require('./intermediateRankingRoutes');
const advancedRankingRoutes = require('./advancedRankingRoutes');
const rankingViewsRoutes = require('./rankingViewsRoutes');


// 引入其他路由文件 as needed

const router = express.Router();

// 使用路由
router.use('/user', userRoutes);
router.use('/gameResult', gameResultRoutes);
router.use('/beginnerRanking', beginnerRankingRoutes);
router.use('/intermediateRanking', intermediateRankingRoutes);
router.use('/advancedRanking', advancedRankingRoutes);
router.use('/views', rankingViewsRoutes);


module.exports = router;
