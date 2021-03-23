const {Sequelize} = require('sequelize');
const keys = require('./server');

const {database} = keys;
const sequelize = new Sequelize(database.databaseName, database.username, database.password, {
    host: database.hostname,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: database.timezone, // for writing to database

  });

module.exports = sequelize;