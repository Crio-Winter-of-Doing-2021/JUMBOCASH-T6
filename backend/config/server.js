if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  console.log("Loading from .env");
}

const dev = {
  database: {
    databaseName: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    hostname: process.env.DB_HOSTNAME,
    timezone: process.env.DB_TIMEZONE,
    uri: process.env.DATABASE_URL,
  },
  auth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
  },
  resetDB: process.env.DB_RESET,
  dbProxy: process.env.DB_PROXY,
  port: process.env.PORT,
  clientUrl: process.env.CLIENT_URL,
};

module.exports = dev;