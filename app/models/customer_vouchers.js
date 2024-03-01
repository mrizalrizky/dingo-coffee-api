'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_vouchers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer_vouchers.init({
    customer_id: {
      type:  DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    promo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'master_promotions',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'customer_vouchers',
    underscored: true,
  });
  return customer_vouchers;
};