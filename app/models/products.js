'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.productCategories, {
        foreignKey: 'product_category_id'
      })
      this.belongsToMany(models.masterBranches, {
        foreignKey: 'product_id',
        through: models.branchProducts
      })
    }
  }
  products.init({
    name: DataTypes.STRING(64),
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    product_category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'products',
    underscored: true,
  });
  return products;
};