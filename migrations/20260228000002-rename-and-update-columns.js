'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Rename status_pengajuan -> status_verifikasi di tabel pengajuan
        const pengajuanDesc = await queryInterface.describeTable('pengajuan');

        if (pengajuanDesc.status_pengajuan && !pengajuanDesc.status_verifikasi) {
            await queryInterface.renameColumn('pengajuan', 'status_pengajuan', 'status_verifikasi');
        }

        // Tambah kolom verified_at jika belum ada
        if (!pengajuanDesc.verified_at) {
            await queryInterface.addColumn('pengajuan', 'verified_at', {
                type: Sequelize.DATE,
                allowNull: true,
            });
        }

        // Update persyaratan_dokumen: rename wajib -> is_required, tambah is_multiple
        const persyDesc = await queryInterface.describeTable('persyaratan_dokumen');

        if (persyDesc.wajib && !persyDesc.is_required) {
            await queryInterface.renameColumn('persyaratan_dokumen', 'wajib', 'is_required');
        }

        if (!persyDesc.is_multiple) {
            await queryInterface.addColumn('persyaratan_dokumen', 'is_multiple', {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                after: 'format_file',
            });
        }

        // Tambah updated_at di dokumen jika belum ada
        const dokDesc = await queryInterface.describeTable('dokumen');
        if (!dokDesc.updated_at) {
            await queryInterface.addColumn('dokumen', 'updated_at', {
                type: Sequelize.DATE,
                allowNull: true,
            });
        }
        // Hapus status_verifikasi dari dokumen jika masih ada
        if (dokDesc.status_verifikasi) {
            await queryInterface.removeColumn('dokumen', 'status_verifikasi');
        }
    },

    async down(queryInterface, Sequelize) {
        const pengajuanDesc = await queryInterface.describeTable('pengajuan');
        if (pengajuanDesc.status_verifikasi && !pengajuanDesc.status_pengajuan) {
            await queryInterface.renameColumn('pengajuan', 'status_verifikasi', 'status_pengajuan');
        }
        if (pengajuanDesc.verified_at) {
            await queryInterface.removeColumn('pengajuan', 'verified_at');
        }

        const persyDesc = await queryInterface.describeTable('persyaratan_dokumen');
        if (persyDesc.is_required && !persyDesc.wajib) {
            await queryInterface.renameColumn('persyaratan_dokumen', 'is_required', 'wajib');
        }
        if (persyDesc.is_multiple) {
            await queryInterface.removeColumn('persyaratan_dokumen', 'is_multiple');
        }
    },
};
