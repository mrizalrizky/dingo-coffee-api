'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer_favorites.init({
    customer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'customer_favorites',
    underscored: true,
  });
  return customer_favorites;
};