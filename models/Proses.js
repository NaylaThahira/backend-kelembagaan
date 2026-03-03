const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Proses = sequelize.define(
    "Proses",
    {
        id_proses: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_proses: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "proses",
        timestamps: false,
    }
);

module.exports = Proses;
