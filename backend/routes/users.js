var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('get user');
});

router.patch('/', function(req, res, next) {
  res.send('update user');
});

module.exports = router;
