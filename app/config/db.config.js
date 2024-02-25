require('dotenv').config()

module.exports = {
  "development": {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    define: { aliases: false },
    pool: {
        min: 0, // min connection
        max: 5, // max connection
        acquire: 30000,
        idle: 10000
    },
    timezone: '+07:00'
  },
  "production": {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    define: { aliases: false },
    pool: {
        min: 0, // min connection
        max: 2, // max connection
        acquire: 30000,
        idle: 10000
    },
    timezone: '+07:00'
  }
}