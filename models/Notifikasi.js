const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notifikasi = sequelize.define(
    "Notifikasi",
    {
        id_notifikasi: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'User yang menerima notifikasi'
        },
        id_pengajuan: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'ID pengajuan terkait (jika ada)'
        },
        judul: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Judul notifikasi'
        },
        pesan: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Isi pesan notifikasi'
        },
        tipe: {
            type: DataTypes.ENUM('pengajuan_baru', 'perubahan_status', 'info'),
            allowNull: false,
            comment: 'Tipe notifikasi'
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: 'Status sudah dibaca atau belum'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "notifikasi",
        timestamps: false,
    }
);

module.exports = Notifikasi;
