const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Dokumen = sequelize.define(
  "Dokumen",
  {
    id_dokumen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pengajuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Pengajuan",
        key: "id_pengajuan",
      },
    },
    id_persyaratan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "persyaratan_dokumen",
        key: "id_persyaratan",
      },
    },
    nama_file: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    path_file: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    jenis_dokumen: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status_verifikasi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "dokumen",
    timestamps: false,
  }
);

module.exports =  Dokumen ;
