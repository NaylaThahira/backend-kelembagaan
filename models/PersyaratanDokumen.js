const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PersyaratanDokumen = sequelize.define(
  "PersyaratanDokumen",
  {
    id_persyaratan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_modul: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "modul_layanan",
        key: "id_modul",
      },
    },
    nama_dokumen: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    format_file: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    wajib: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "persyaratan_dokumen",
    timestamps: false,
  }
);

module.exports = PersyaratanDokumen ;
