'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer_addresses.init({
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    address_details: DataTypes.STRING,
    location_details: DataTypes.STRING(128),
    recipient_name: DataTypes.STRING(64),
    recipient_phone: DataTypes.STRING(20),
  }, {
    sequelize,
    modelName: 'customer_addresses',
    underscored: true,
  });
  return customer_addresses;
};