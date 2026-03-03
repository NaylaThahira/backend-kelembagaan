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
    tableName: "modul_layanan",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = ModulLayanan;
