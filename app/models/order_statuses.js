'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_statuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_statuses.init({
    status_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order_statuses',
    underscored: true,
  });
  return order_statuses;
};