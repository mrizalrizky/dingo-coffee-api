"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.orderStatus, {
        foreignKey: "order_status_id",
      });
    }
  }
  transactions.init(
    {
      invoice_number: {
        type: DataTypes.STRING(64),
        unique: true,
      },
      invoice_amount: DataTypes.INTEGER,
      payment_method_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "master_payment_methods",
          key: "id",
        },
      },
      branch_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "master_branches",
          key: "id",
        },
      },
      customer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "customers",
          key: "id",
        },
      },
      employee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "employees",
          key: "id",
        },
      },
      order_status_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "order_statuses",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "transactions",
      underscored: true,
    }
  );
  return transactions;
};
