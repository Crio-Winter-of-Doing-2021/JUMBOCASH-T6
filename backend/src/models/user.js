const Sequelize = require('sequelize');
const db = require('../../config/database');

const User = db.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    emailId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contact: {
        type: Sequelize.STRING,
        allowNull: true
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    }
});



module.exports = User;