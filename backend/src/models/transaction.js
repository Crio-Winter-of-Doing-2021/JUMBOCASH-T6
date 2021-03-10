const Sequelize = require('sequelize');
const db = require('../../config/database');

const User = require('./user');
const Entity = require('./entity');

const Transaction = db.define('transactions', {
    id: {
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
        primaryKey: true
    },
    // userId: {
    //     type: Sequelize.UUID,
    //     primaryKey: true,
    // },
    // entityId: {
    //     type: Sequelize.UUID,
    //     primaryKey: true,
    // },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amountPayable: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    paymentMode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    paymentStatus: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

// foreign key
User.hasMany(Transaction, {
    foreignKey: "userId"
});
Transaction.belongsTo(User);

Entity.hasMany(Transaction, {
    foreignKey: "entityId"
});
Transaction.belongsTo(Entity);


module.exports = Transaction;