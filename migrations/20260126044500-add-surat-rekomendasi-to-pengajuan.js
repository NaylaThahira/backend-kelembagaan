'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const tableDescription = await queryInterface.describeTable('pengajuan');

        if (!tableDescription.file_surat_rekomendasi) {
            await queryInterface.addColumn('pengajuan', 'file_surat_rekomendasi', {
                type: Sequelize.STRING(255),
                allowNull: true,
                comment: 'Path file surat rekomendasi dari admin (output final)'
            });
        }

        if (!tableDescription.tanggal_selesai) {
            await queryInterface.addColumn('pengajuan', 'tanggal_selesai', {
                type: Sequelize.DATE,
                allowNull: true,
                comment: 'Tanggal admin menyelesaikan pengajuan'
            });
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('pengajuan', 'file_surat_rekomendasi');
        await queryInterface.removeColumn('pengajuan', 'tanggal_selesai');
    }
};
