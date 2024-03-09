'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_number: {
        type: Sequelize.STRING(64)
      },
      invoice_amount: {
        type: Sequelize.INTEGER
      },
      payment_method_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'master_payment_methods',
          key: 'id'
        }
      },
      branch_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'master_branches',
          key: 'id'
        }
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      order_status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'order_statuses',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};