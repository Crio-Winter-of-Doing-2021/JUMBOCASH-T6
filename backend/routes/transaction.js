var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('../src/controllers/transaction').getTransactions);

router.post('/filter', require('../src/controllers/transaction').getTransactionsWithFilter)

module.exports = router;