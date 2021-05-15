var express = require('express');
var router = express.Router();

const analyticsController = require('../controllers/analytics');

router.post('/cashflow', analyticsController.getTotalFlow);

router.post('/entity', analyticsController.getEntityAnalytics)

router.post('/trend', analyticsController.getTrend)

router.post('/csv', analyticsController.generateCsvReport);

module.exports = router;