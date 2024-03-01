'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_categories.init({
    name: DataTypes.STRING(32)
  }, {
    sequelize,
    modelName: 'product_categories',
    underscored: true,
  });
  return product_categories;
};