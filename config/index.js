const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DOMAIN: process.env.DOMAIN,
  PORT: process.env.PORT,
  
  DB_USERNAME_PROD: process.env.DB_USERNAME_PROD,
  DB_PASSWORD_PROD: process.env.DB_PASSWORD_PROD,
  DB_DATABASE_PROD: process.env.DB_DATABASE_PROD,
  DB_HOST_PROD: process.env.DB_HOST_PROD,
  DB_PORT_PROD: process.env.DB_PORT_PROD,
  DB_DIALECT_PROD: process.env.DB_DIALECT_PROD,

  DB_USERNAME_DEV: process.env.DB_USERNAME_DEV,
  DB_PASSWORD_DEV: process.env.DB_PASSWORD_DEV,
  DB_DATABASE_DEV: process.env.DB_DATABASE_DEV,
  DB_HOST_DEV: process.env.DB_HOST_DEV,
  DB_PORT_DEV: process.env.DB_PORT_DEV,
  DB_DIALECT_DEV: process.env.DB_DIALECT_DEV,

  JWT_SECRET: process.env.JWT_SECRET,
  TIME_ZONE: process.env.TIME_ZONE
};
