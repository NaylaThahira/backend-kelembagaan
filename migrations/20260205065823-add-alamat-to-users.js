'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'alamat', {
      type: Sequelize.STRING(300),
      allowNull: false,
      defaultValue: '-', 
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'alamat');
  }
};
