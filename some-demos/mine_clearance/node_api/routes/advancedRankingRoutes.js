// routes/advancedRankingsRoutes.js
const express = require('express');
const router = express.Router();
// Import necessary controller functions
const { getAllAdvancedRankings, getAdvancedRankingById, createAdvancedRanking } = require('../controllers/advancedRankingController');

router.get('/advancedRankings', getAllAdvancedRankings);
router.get('/advancedRankings/:id', getAdvancedRankingById);
router.post('/advancedRankings', createAdvancedRanking);

module.exports = router;
