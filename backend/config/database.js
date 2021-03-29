const {Sequelize} = require('sequelize');
const keys = require('./server');

const {database, dbProxy} = keys;
let sequelize;

const postgresOption = {
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
  },
  timezone: database.timezone, // for writing to database
}

if(dbProxy === "remote") { 
  console.log("with db uri");

  // Enable ssl connection
  postgresOption.dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: false
  }

  sequelize = new Sequelize(database.uri, postgresOption);
 }

else if(dbProxy === "local") {
  console.log("without db uri");
  sequelize = new Sequelize(database.databaseName, database.username, database.password, postgresOption);
}
module.exports = sequelize;