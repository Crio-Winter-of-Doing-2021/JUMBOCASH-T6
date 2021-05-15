// const entities = require("../seed/entity");
const entityProxy = require("../proxy/entity");

// ======================== Version 1
// DEPRECATED
const getEntities = (req, res) => {
  console.log("entity");

  res.send(entities);
};

// ========================  Version 2

const getAllEntities = async (req, res) => {

  console.log(`get all entity with user Id ${req.userId}`);
  const userId = req.userId;

  entityProxy
    .findAll(userId)
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
  console.log(`get particular entity of Id: ${id} with user Id ${req.userId}`);

  entityProxy
    .findById(id, req.userId)
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
    console.log(`update particular entity of Id: ${id} with user Id ${req.userId}`);

  entityProxy
    .updateEntity(entityBody, id, req.userId)
    .then((value) => {

      if(value[0] === 0) {
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

const createEntity = async (req, res) => {

  console.log(`create entity ${req.body} with user Id ${req.userId}`);

  let entity = req.body;
  // inject userId in entity
  entity.userId = req.userId;

  entityProxy
    .create(entity)
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
