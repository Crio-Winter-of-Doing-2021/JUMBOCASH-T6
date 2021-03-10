const Sequelize = require('sequelize');
const db = require('../../config/database');

const User = require('./user');

const Entity = db.define('entities', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contact: {
        type: Sequelize.STRING,
        allowNull: true
        
    }
});

// foreign key
User.hasMany(Entity, {
    foreignKey: "userId"
});
Entity.belongsTo(User);


module.exports = Entity;