const express = require('express');
const router = express.Router();
const { getAllIntermediateRankings, getIntermediateRankingById, createIntermediateRanking } = require('../controllers/intermediateRankingController');

router.get('/intermediateRankings', getAllIntermediateRankings);
router.get('/intermediateRankings/:id', getIntermediateRankingById);
router.post('/intermediateRankings', createIntermediateRanking);

module.exports = router;
