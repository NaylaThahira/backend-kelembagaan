const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BuktiDukungProses = sequelize.define(
    "BuktiDukungProses",
    {
        id_bukti: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_log: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "log_proses",
                key: "id_log",
            },
        },
        nama_file: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        file_path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        uploaded_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "bukti_dukung_proses",
        timestamps: false,
    }
);

module.exports = BuktiDukungProses;
