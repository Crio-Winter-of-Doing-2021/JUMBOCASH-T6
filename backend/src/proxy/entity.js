const Entity = require('../models/entity');
const validation = require('../services/validation');
const errorHandler = require('../services/handleErrors');
const User = require('../models/user');

var EntityDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateEntity: updateEntity
}

async function findAll(userId) {
    try {
        return await Entity.findAll({where: {userId}});
    } catch (err) {
        errorHandler(err);
    }
}

async function findById(id, userId) {

    try {
        // test for uuid
        // user will only be able to see entity added by him
        if(validation.isUUIDV4(id) && validation.isUUIDV4(userId)) {
            return await Entity.findOne({where: {id, userId}});
        }
    } catch (err) {
        errorHandler(err);
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
            contact: newEntity.contact,
            userId: newEntity.userId
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

async function updateEntity(entity, id, userId) {

    try {

        // name, userId cannot be updated
        if(! (validation.isUUIDV4(id) && 
            validation.isUUIDV4(userId) &&
            validation.isValidContact(entity.contact) && 
            validation.isValidAddress(entity.address)) ) {

            return false;
        }
        
        let entityFound = await Entity.findOne({where: {id, userId}});

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

module.exports = EntityDao;