'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tables.init({
    table_number: DataTypes.INTEGER,
    active_flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tables',
    underscored: true,
  });
  return tables;
};