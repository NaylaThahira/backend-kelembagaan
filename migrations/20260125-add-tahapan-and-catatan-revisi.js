'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tableDescription = await queryInterface.describeTable('pengajuan');

        if (!tableDescription.tahapan_proses) {
            await queryInterface.addColumn('pengajuan', 'tahapan_proses', {
                type: Sequelize.STRING(100),
                allowNull: true,
                comment: 'Tahapan: Penjadwalan Rapat, Pelaksanaan Rapat Fasilitasi, Penyusunan Draft Rekomendasi/Hasil Fasilitasi, Proses Penandatanganan'
            });
        }
        if (tableDescription.catatan_revisi) {
            await queryInterface.removeColumn('pengajuan', 'catatan_revisi');
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('pengajuan', 'tahapan_proses');
        await queryInterface.addColumn('pengajuan', 'catatan_revisi', {
            type: Sequelize.TEXT,
            allowNull: true
        });
    }
};
