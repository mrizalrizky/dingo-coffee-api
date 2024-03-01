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

db.masterGroups = require('./master_groups')(sequelize, Sequelize)
db.groupRoles = require('./group_roles')(sequelize, Sequelize)
db.employeeGroupRoles = require('./employee_group_roles')(sequelize, Sequelize)
db.employees = require('./employees')(sequelize, Sequelize)
db.products = require('./products')(sequelize, Sequelize)
db.productCategories = require('./product_categories')(sequelize, Sequelize)
db.masterPromotions = require('./master_promotions')(sequelize, Sequelize)
db.masterBranches = require('./master_branches')(sequelize, Sequelize)
db.branchProducts = require('./branch_products')(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
