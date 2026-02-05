'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'no_hp', {
      type: Sequelize.STRING(20),
      allowNull: true,   
      comment: 'Nomor HP pengguna'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'no_hp');
  }
};
