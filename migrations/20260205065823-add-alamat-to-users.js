'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('users');

    // Hanya tambah kolom 'alamat' jika belum ada
    if (!tableDescription.alamat) {
      await queryInterface.addColumn('users', 'alamat', {
        type: Sequelize.STRING(300),
        allowNull: false,
        defaultValue: '-',
      });
    }
  },

  async down(queryInterface) {
    const tableDescription = await queryInterface.describeTable('users');

    // Hanya hapus kolom 'alamat' jika ada
    if (tableDescription.alamat) {
      await queryInterface.removeColumn('users', 'alamat');
    }
  }
};
