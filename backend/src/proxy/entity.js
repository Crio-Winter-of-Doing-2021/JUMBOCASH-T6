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

    // name, userId cannot be updated
    if(validation.isUUIDV4(id)) {
        var updateEntity = {
            address: entity.address,
            contact: entity.contact
        }
    }
    
    return await Entity.update(updateEntity, { where: { id: id } });
}


module.exports = EntityDao;