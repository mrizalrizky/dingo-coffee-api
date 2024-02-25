'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_roles.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'master_roles',
    underscored: true
  });
  return master_roles;
};