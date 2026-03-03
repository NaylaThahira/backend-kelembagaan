'use strict';

module.exports = {
    up: async (queryInterface) => {
        const desc = await queryInterface.describeTable('pengajuan');
        // tahapan_proses sudah tidak digunakan (digantikan tabel proses & log_proses)
        if (desc.catatan_revisi) {
            await queryInterface.removeColumn('pengajuan', 'catatan_revisi');
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('pengajuan', 'catatan_revisi', {
            type: Sequelize.TEXT,
            allowNull: true
        });
    }
};
