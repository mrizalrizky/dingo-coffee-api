'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'master_groups',
          key: 'id'
        }
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
      password: Sequelize.STRING,
      active_flag: Sequelize.BOOLEAN,
      refresh_token: Sequelize.STRING,
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};