const Sequelize = require('sequelize');
const db = require('../../config/database');

const User = require('./user');
const Entity = require('./entity');
// schema of transaction
const Transaction = db.define('transactions', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    entityId: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    paymentMode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: Sequelize.DATE,
        defaultValue: new Date().toISOString(),
        allowNull: false
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