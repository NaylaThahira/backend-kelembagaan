'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Tabel proses (master)
        await queryInterface.createTable('proses', {
            id_proses: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nama_proses: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
        });

        // Tabel log_proses
        await queryInterface.createTable('log_proses', {
            id_log: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            id_pengajuan: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'pengajuan', key: 'id_pengajuan' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            id_proses: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'proses', key: 'id_proses' },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            keterangan: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });

        await queryInterface.addIndex('log_proses', ['id_pengajuan']);
        await queryInterface.addIndex('log_proses', ['id_proses']);

        // Tabel bukti_dukung_proses
        await queryInterface.createTable('bukti_dukung_proses', {
            id_bukti: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            id_log: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'log_proses', key: 'id_log' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            nama_file: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            file_path: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            uploaded_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });

        await queryInterface.addIndex('bukti_dukung_proses', ['id_log']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('bukti_dukung_proses');
        await queryInterface.dropTable('log_proses');
        await queryInterface.dropTable('proses');
    },
};
