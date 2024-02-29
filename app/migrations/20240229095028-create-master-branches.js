'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_branches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(128)
      },
      address: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING(20)
      },
      operational_days: {
        type: Sequelize.STRING(32)
      },
      operational_hour: {
        type: Sequelize.STRING(32)
      },
      pickup_flag: {
        type: Sequelize.BOOLEAN
      },
      dine_in_flag: {
        type: Sequelize.BOOLEAN
      },
      delivery_flag: {
        type: Sequelize.BOOLEAN
      },
      gmaps_url: {
        type: Sequelize.STRING(128)
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
    await queryInterface.dropTable('master_branches');
  }
};