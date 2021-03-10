var express = require("express");
var router = express.Router();

const entityController = require('../src/controllers/entity');

/* GET home page. */
// router.get('/', require('../src/controllers/entity').getEntities);

// get all entity
router.get("/", entityController.getAllEntities);

// get entity having id
router.get("/:id", entityController.getEntityById);

// update entity having id
router.patch("/:id", entityController.updateEntityById);

// create entity
router.post("/", entityController.createEntity);

module.exports = router;
