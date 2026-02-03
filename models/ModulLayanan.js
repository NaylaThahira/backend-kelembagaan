const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ModulLayanan = sequelize.define(
  "ModulLayanan",
  {
    id_modul: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_modul: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    deskripsi: DataTypes.TEXT,
  },
  {
    tableName: "modul_layanan",
    timestamps: false,
  }
);

module.exports = ModulLayanan;
