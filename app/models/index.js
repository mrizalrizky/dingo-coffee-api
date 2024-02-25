'use strict';

const Sequelize = require('sequelize');
const config = require('../config/db.config')[process.env.NODE_ENV || 'development']
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.rolesDB = require('../models/master_roles')(sequelize, Sequelize)
db.employeesDB = require('./employees')(sequelize, Sequelize)
db.productsDB = require('./master_products')(sequelize, Sequelize)
db.promoDB = require('./promotion_packages')(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
