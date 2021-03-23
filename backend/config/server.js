if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}


const dev = {
    database: {
        databaseName: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        hostname: process.env.DB_HOSTNAME,
        timezone: process.env.DB_TIMEZONE
    },
    resetDB: process.env.DB_RESET,
    port: process.env.PORT,
}

module.exports = dev;
