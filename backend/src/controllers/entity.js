const entities = require('../seed/entity');

module.exports.getEntities = (req, res) => {

    console.log("entity");

    res.send(entities);
}