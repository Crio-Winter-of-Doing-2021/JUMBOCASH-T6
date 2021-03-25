const {Sequelize} = require('sequelize');
const keys = require('./server');

const {database} = keys;
let sequelize;

if(database.uri) { 
  console.log("with db uri");
  sequelize = new Sequelize(database.uri, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
      useUTC: false, // for reading from database
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    timezone: database.timezone, // for writing to database

  });
 }

else{
  console.log("without db uri", database.uri);
  sequelize = new Sequelize(database.databaseName, database.username, database.password, {
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
}
module.exports = sequelize;