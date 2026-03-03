const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LogProses = sequelize.define(
    "LogProses",
    {
        id_log: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pengajuan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pengajuan",
                key: "id_pengajuan",
            },
        },
        id_proses: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "proses",
                key: "id_proses",
            },
        },
        keterangan: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "log_proses",
        timestamps: false,
    }
);

module.exports = LogProses;
