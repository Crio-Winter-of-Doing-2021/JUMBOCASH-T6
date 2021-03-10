const entities = require("../seed/entity");
const entityProxy = require("../proxy/entity");

// ======================== Version 1

module.exports.getEntities = (req, res) => {
  console.log("entity");

  res.send(entities);
};

// ========================  Version 2

const getAllEntities = async (req, res) => {

  entityProxy
    .findAll()
    .then((value) => {
      res.status(200).send({
        error: false,
        data: value,
      });
    })
    .catch((err) => {
        res.status(err.code).send({
          error: true,
          errorMessage: err.message,
        });
      });
};

const getEntityById = async (req, res) => {

  const id = req.params.id;

  entityProxy
    .findById(id)
    .then((value) => {

      if(value === null) {
          throw {code: 404, message: "Entity does not exist"}
      }

      res.status(200).send({
        error: false,
        data: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
        error: true,
        errorMessage: err.message,
      });
    });
};

const updateEntityById = async (req, res) => {

    const id = req.params.id;

    const entityBody = req.body;

  entityProxy
    .updateEntity(entityBody, id)
    .then((value) => {
      res.status(200).send({
        error: false,
        data: value,
      });
    })
    .catch((err) => {
        res.status(err.code).send({
          error: true,
          errorMessage: err.message,
        });
      });
};

const createEntity = async (req, res) => {

  entityProxy
    .create(req.body)
    .then((value) => {
      res.status(201).send({
        error: false,
        entity: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
          error: true,
          errorMessage: err.message,
      });
    });
};

const entityController = {
  getAllEntities,
  getEntityById,
  updateEntityById,
  createEntity,
};

module.exports = entityController;
