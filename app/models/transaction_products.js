'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction_products.init({
    transaction_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction_products',
  });
  return transaction_products;
};