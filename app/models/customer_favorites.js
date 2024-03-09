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
      this.belongsTo(models.customers, {
        foreignKey: 'customer_id'
      })
      this.belongsTo(models.products, {
        foreignKey: 'product_id'
      })
    }
  }
  customer_favorites.init({
    customer_id:{
      type:  DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'customer_favorites',
    underscored: true,
  });
  return customer_favorites;
};