'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_group_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.groupRoles, {
        foreignKey: 'group_role_id'
      })
    }
  }
  employee_group_roles.init({
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'master_groups',
        key: 'id'
      }
    },
    group_role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'group_roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'employee_group_roles',
    underscored: true,
  });
  return employee_group_roles;
};