'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.masterGroups, {
        foreignKey: 'group_id'
      })
    }
  }
  employees.init({
    name: DataTypes.STRING(64),
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'master_groups',
        key: 'id'
      }
    },
    username: {
      type: DataTypes.STRING(32),
      unique: true,
    },
    phone_number: DataTypes.STRING(20),
    email: {
      type: DataTypes.STRING(64),
      unique: true
    },
    password: DataTypes.STRING,
    active_flag: DataTypes.BOOLEAN,
    refresh_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employees',
    underscored: true
  });
  return employees;
};