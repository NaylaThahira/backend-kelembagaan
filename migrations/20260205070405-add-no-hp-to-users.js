'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('users');

    // Hanya tambah kolom 'no_hp' jika belum ada
    if (!tableDescription.no_hp) {
      await queryInterface.addColumn('users', 'no_hp', {
        type: Sequelize.STRING(20),
        allowNull: true,
        comment: 'Nomor HP pengguna'
      });
    }
  },

  async down(queryInterface) {
    const tableDescription = await queryInterface.describeTable('users');

    // Hanya hapus kolom 'no_hp' jika ada
    if (tableDescription.no_hp) {
      await queryInterface.removeColumn('users', 'no_hp');
    }
  }
};
