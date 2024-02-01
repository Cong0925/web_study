const express = require('express');
const router = express.Router();
const { getAllGameResults, getGameResultByUserId, createGameResult } = require('../controllers/gameResultController');

router.get('/gameResults', getAllGameResults);
router.get('/gameResults/:id', getGameResultByUserId);
router.post('/gameResults', createGameResult);

module.exports = router;
