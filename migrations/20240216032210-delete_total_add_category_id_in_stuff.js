"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Stuff", "category_id", {
      type: Sequelize.INTEGER,
      // allowNull: false,
    });

    await queryInterface.removeColumn("Stuff", "total");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("Stuff", "category_id");

    await queryInterface.addColumn("Stuff", "total", {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },
};
