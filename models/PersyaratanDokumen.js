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
      allowNull: true,
    },
    is_multiple: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: "persyaratan_dokumen",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = PersyaratanDokumen;
