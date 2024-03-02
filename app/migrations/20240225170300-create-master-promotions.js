'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_promotions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      promo_name: {
        type: Sequelize.STRING(64)
      },
      promo_description: {
        type: Sequelize.STRING
      },
      voucher_code: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      voucher_valid_start: {
        type: Sequelize.DATE
      },
      voucher_valid_end: {
        type: Sequelize.DATE
      },
      discount_fee: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      discount_percentage: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      customer_voucher_flag: {
        type: Sequelize.BOOLEAN
      },
      merchant_voucher_flag: {
        type: Sequelize.BOOLEAN
      },
      dine_in_voucher_flag: {
        type: Sequelize.BOOLEAN
      },
      delivery_voucher_flag: {
        type: Sequelize.BOOLEAN
      },
      pickup_voucher_flag: {
        type: Sequelize.BOOLEAN
      },
      can_combine_promo_flag: {
        type: Sequelize.BOOLEAN
      },
      active_flag: {
        type: Sequelize.BOOLEAN,
      },
      show_flag: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('promotion_packages');
  }
};