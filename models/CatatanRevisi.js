const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CatatanRevisi = sequelize.define(
    "CatatanRevisi",
    {
        id_catatan_revisi: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pengajuan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        catatan: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "Username admin yang membuat catatan"
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "catatan_revisi",
        timestamps: false,
    }
);

module.exports = CatatanRevisi;
