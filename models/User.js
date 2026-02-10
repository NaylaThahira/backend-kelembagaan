const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kabupaten_kota: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Nama Kabupaten/Kota',
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            comment: 'Username untuk login',
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        alamat: {
            type: DataTypes.STRING(300),
            allowNull: true,
            defaultValue: '',
        },
        no_hp: {
            type: DataTypes.STRING(300),
            allowNull: true,
            defaultValue: '',
        },
        role: {
            type: DataTypes.ENUM('admin', 'kab/kota'),
            allowNull: false,
            defaultValue: 'kab/kota',
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "users",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            // Hook untuk enkripsi password sebelum disimpan
            beforeCreate: async (user, options) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user, options) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
    }
);

// Instance method untuk compare password
User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;

