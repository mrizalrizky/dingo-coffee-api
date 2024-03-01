'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  group_roles.init({
    role_name: DataTypes.STRING(128),
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'group_roles',
    underscored: true,
  });
  return group_roles;
};