// routes/beginnerRankingRoutes.js
const express = require('express');
const rankingViewsController = require('../controllers/rankingViewsController');

const router = express.Router();

router.get('/beginner-rankings', rankingViewsController.getAllBeginnerRankingsView);
router.get('/beginner-rankings/:id', rankingViewsController.getAllBeginnerRankingsViewByUserId);

router.get('/intermediate-rankings', rankingViewsController.getAllIntermediateRankingsView);
router.get('/intermediate-rankings/:id', rankingViewsController.getAllIntermediateRankingsViewByUserId);

router.get('/advanced-rankings', rankingViewsController.getAllAdvancedRankingsView);
router.get('/advanced-rankings/:id', rankingViewsController.getAllAdvancedRankingsViewByUserId);



module.exports = router;
