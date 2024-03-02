'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_promotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_promotions.init({
    promo_name: DataTypes.STRING(64),
    promo_description: DataTypes.STRING,
    voucher_code: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    discount_fee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount_percentage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    voucher_valid_start: DataTypes.DATE,
    voucher_valid_end: DataTypes.DATE,
    customer_voucher_flag: DataTypes.BOOLEAN,
    merchant_voucher_flag: DataTypes.BOOLEAN,
    dine_in_voucher_flag: DataTypes.BOOLEAN,
    delivery_voucher_flag: DataTypes.BOOLEAN,
    pickup_voucher_flag: DataTypes.BOOLEAN,
    can_combine_promo_flag: DataTypes.BOOLEAN,
    active_flag: DataTypes.BOOLEAN,
    show_flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'master_promotions',
    underscored: true,
  });
  return master_promotions;
};