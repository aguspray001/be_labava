'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('RentRoomTransactions', 'return_data', 'return_date');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('RentRoomTransactions', 'return_date', 'return_data');
  }
};