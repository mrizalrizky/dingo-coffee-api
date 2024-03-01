'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(64)
      },
      username: {
        type: Sequelize.STRING(32),
        unique: true,
      },
      phone_number: Sequelize.STRING(20),
      email: {
        type: Sequelize.STRING(64),
        unique: true
      },
      password: {
        type: Sequelize.STRING,
      },
      active_flag: {
        type: Sequelize.BOOLEAN
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      points_balance: {
        type: Sequelize.INTEGER
      },
      qr_code_data: {
        type: Sequelize.STRING(64)
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};