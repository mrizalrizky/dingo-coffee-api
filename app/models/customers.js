'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.customerFavorites)
    }
  }
  customers.init({
    name: DataTypes.STRING(64),
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
    refresh_token: DataTypes.STRING,
    points_balance: DataTypes.INTEGER,
    qr_code_data: DataTypes.STRING(64)
  }, {
    sequelize,
    modelName: 'customers',
    underscored: true
  });
  return customers;
};