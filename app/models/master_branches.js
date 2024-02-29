'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_branches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_branches.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING(20),
    operational_days: DataTypes.STRING(32),
    operational_hour: DataTypes.STRING(32),
    pickup_flag: DataTypes.BOOLEAN,
    dine_in_flag: DataTypes.BOOLEAN,
    delivery_flag: DataTypes.BOOLEAN,
    gmaps_url: DataTypes.STRING(128)
  }, {
    sequelize,
    modelName: 'master_branches',
    underscored: true,
  });
  return master_branches;
};