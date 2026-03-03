const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pengajuan = sequelize.define(
  "Pengajuan",
  {
    id_pengajuan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_modul: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tanggal_pengajuan: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status_verifikasi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    catatan_pemohon: DataTypes.TEXT,
    file_surat_rekomendasi: DataTypes.STRING(255),
    tanggal_selesai: DataTypes.DATEONLY,
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "pengajuan",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Pengajuan;
