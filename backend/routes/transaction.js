var express = require("express");
var router = express.Router();
const transactionController = require('../src/controllers/transaction');

/* GET home page. */
// router.get('/', require('../src/controllers/transaction').getTransactions);

// router.post('/filter', require('../src/controllers/transaction').getTransactionsWithFilter)

// get all transaction
router.get("/", transactionController.getAllTransactions);

// get transaction having id
router.get("/:id", transactionController.getTransactionById);

// update transaction having id
router.patch("/:id", transactionController.updateTransactionById);

// filter all transaction
router.post("/filter", transactionController.getAllTransactions);

// create transaction
router.post("/", transactionController.createTransaction);

module.exports = router;
