var express = require('express');
var router = express.Router();

const userController = require('../src/controllers/user');

router.get('/me', userController.getUserById);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.session.passport);
});

router.patch('/', function(req, res, next) {
  res.send('update user');
});



module.exports = router;
