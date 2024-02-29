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
    package_name: DataTypes.STRING(64),
    promo_code: DataTypes.STRING(32),
    table_discount_percentage: DataTypes.INTEGER,
    active_flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'master_promotions',
    underscored: true,
  });
  return master_promotions;
};