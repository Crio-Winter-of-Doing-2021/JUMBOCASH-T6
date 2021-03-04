var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('../src/controllers/entity').getEntities);

module.exports = router;