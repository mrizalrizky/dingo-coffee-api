'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_payment_methods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_payment_methods.init({
    name: DataTypes.STRING(32),
    initial: DataTypes.STRING(16)

  }, {
    sequelize,
    modelName: 'master_payment_methods',
    underscored: true,
  });
  return master_payment_methods;
};