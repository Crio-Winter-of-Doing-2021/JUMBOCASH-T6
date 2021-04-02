var express = require('express');
var router = express.Router();

const analyticsController = require('../src/controllers/analytics');

router.post('/', analyticsController.getTotal);

module.exports = router;