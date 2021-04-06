var express = require('express');
var router = express.Router();

const analyticsController = require('../src/controllers/analytics');

router.post('/cashflow', analyticsController.getTotalFlow);

router.post('/entity', analyticsController.getEntityAnalytics)

router.post('/trend', analyticsController.getTrend)

module.exports = router;