'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.employeeGroupRoles, {
        foreignKey: 'group_id'
      })
    }
  }
  master_groups.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'master_groups',
    underscored: true
  });
  return master_groups;
};