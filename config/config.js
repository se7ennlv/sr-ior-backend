const config = require("./index");

module.exports = {
  development: {
    username: config.DB_USERNAME_DEV,
    password: config.DB_PASSWORD_DEV,
    database: config.DB_DATABASE_DEV,
    host: config.DB_HOST_DEV,
    port: config.DB_PORT_DEV,
    dialect: config.DB_DIALECT_DEV,
    timezone: config.TIME_ZONE
  },
  production: {
    username: config.DB_USERNAME_PROD,
    password: config.DB_PASSWORD_PROD,
    database: config.DB_DATABASE_PROD,
    host: config.DB_HOST_PROD,
    port: config.DB_PORT_PROD,
    dialect: config.DB_DIALECT_PROD,
    // timezone: config.TIME_ZONE
  },
};
