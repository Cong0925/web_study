const express = require('express');
const router = express.Router();
const { getAllBeginnerRankings, getBeginnerRankingById, createBeginnerRanking } = require('../controllers/beginnerRankingController');

router.get('/beginnerRankings', getAllBeginnerRankings);
router.get('/beginnerRankings/:id', getBeginnerRankingById);
router.post('/beginnerRankings', createBeginnerRanking);

module.exports = router;
