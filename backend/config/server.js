if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
    console.log("Loading from .env");
}


const dev = {
    database: {
        databaseName: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        hostname: process.env.DB_HOSTNAME,
        timezone: process.env.DB_TIMEZONE,
        uri: process.env.DATABASE_URL
    },
    resetDB: process.env.DB_RESET,
    port: process.env.PORT,
}

module.exports = dev;
