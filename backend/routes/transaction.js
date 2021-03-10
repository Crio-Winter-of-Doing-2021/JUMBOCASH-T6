var express = require("express");
var router = express.Router();

/* GET home page. */
// router.get('/', require('../src/controllers/transaction').getTransactions);

// router.post('/filter', require('../src/controllers/transaction').getTransactionsWithFilter)

router.get("/", function (req, res, next) {
  res.send("get all transaction");
});

router.get("/:id", function (req, res, next) {
  res.send("get transaction having id");
});

router.patch("/:id", function (req, res, next) {
    res.send("update transaction having id");
  });

router.post("/filter", function (req, res, next) {
  res.send("filter all transaction");
});

router.post("/", function (req, res, next) {
  res.send("create transaction");
});

module.exports = router;
