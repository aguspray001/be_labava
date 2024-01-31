'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RentRoomTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      rent_date: {
        type: Sequelize.STRING
      },
      return_data: {
        type: Sequelize.STRING
      },
      pupose: {
        type: Sequelize.STRING
      },
      dosen_pengampu: {
        type: Sequelize.STRING
      },
      activity: {
        type: Sequelize.STRING
      },
      organization: {
        type: Sequelize.STRING
      },
      accepted_status_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RentRoomTransactions');
  }
};