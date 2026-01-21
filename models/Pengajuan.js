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
    nomor_registrasi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_modul: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "modul_layanan",
        key: "id_modul",
      },
    },
    tanggal_pengajuan: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status_pengajuan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    progress_persen: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    catatan_pemohon: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "pengajuan",
    timestamps: false,
  }
);

module.exports = { Pengajuan };
