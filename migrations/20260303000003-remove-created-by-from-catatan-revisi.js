'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('catatan_revisi', 'created_by');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('catatan_revisi', 'created_by', {
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: 'admin',
      comment: 'Username admin yang membuat catatan'
    });
  }
};
