const Entity = require('../models/entity');
const validation = require('../services/validation');

var EntityDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateEntity: updateEntity
}

async function findAll() {
    return await Entity.findAll();
}

async function findById(id) {

    // test for uuid
    if(validation.isUUIDV4(id)) {
        return await Entity.findByPk(id);
    }
}

async function deleteById(id) {
    return await Entity.destroy({ where: { id: id } });
}

async function create(entity) {

    try {
        if(validation.isValidEntity(entity) ) {
            var newEntity = new Entity(entity);
        }

        // Check for duplicate entry
        const similarEntity = await Entity.findOne({ where: { 
            name: newEntity.name,
            address: newEntity.address,
            contact: newEntity.contact
        } });

        if (similarEntity !== null) {
            throw {code: 409, message: "Entity already exist"}
        }

        return await newEntity.save();

    } catch(err) {
        if(err.code) {
            throw err;
        } else {
            throw {code: 500, message: err}
        }
        
    };
    
}

async function updateEntity(entity, id) {

    try {

        // name, userId cannot be updated
        if(! (validation.isUUIDV4(id) && 
            validation.isValidContact(entity.contact)) && 
            validation.isValidAddress(entity.address)) {

            return false;
        }
        
        let entityFound = await Entity.findByPk(id);

        if(entityFound === null ) {
            throw {code: 404, message: "Not found"}
        }

        if(entity.address){
            entityFound.address = entity.address;
        } if(entity.contact) {
            entityFound.contact = entity.contact;
        }

        return await entityFound.save();

    } catch(err) {
        errorHandler(err);
    };
    
    
}

function errorHandler(err) {

    if(err instanceof Error) {
        console.log(err);
        throw {code: 500, message: err};
    } else if(err.code) {
        throw err;
    } else {
        throw {code: 500, message: err}
    }
  }

module.exports = EntityDao;