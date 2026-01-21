const User = require('../models/User');

// Get all users (pemohon only, not admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { role: 'pemohon' },
            attributes: ['id', 'kabupaten_kota', 'username', 'created_at'],
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data pengguna'
        });
    }
};

// Create new user
exports.createUser = async (req, res) => {
    try {
        const { kabupaten_kota, username, password } = req.body;

        // Validation
        if (!kabupaten_kota || !username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Semua field wajib diisi'
            });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username sudah terdaftar'
            });
        }

        // Create user (password will be automatically hashed by beforeCreate hook)
        const newUser = await User.create({
            kabupaten_kota,
            username,
            password,
            role: 'pemohon'
        });

        res.status(201).json({
            success: true,
            message: 'Akun berhasil dibuat',
            data: {
                id: newUser.id,
                kabupaten_kota: newUser.kabupaten_kota,
                username: newUser.username
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal membuat akun'
        });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { kabupaten_kota, username, password } = req.body;

        // Find user
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        // Check if username is already used by another user
        if (username && username !== user.username) {
            const usernameExists = await User.findOne({
                where: {
                    username,
                    id: { [require('sequelize').Op.ne]: id }
                }
            });

            if (usernameExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Username sudah digunakan oleh pengguna lain'
                });
            }
        }

        // Prepare update data
        const updateData = {
            kabupaten_kota,
            username
        };

        // Only include password if it's provided and not empty
        if (password && password.trim() !== '') {
            updateData.password = password; // Will be hashed by beforeUpdate hook
        }

        // Update user
        await user.update(updateData);

        res.json({
            success: true,
            message: 'Data pengguna berhasil diperbarui'
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui data pengguna'
        });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find user
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        // Delete user
        await user.destroy();

        res.json({
            success: true,
            message: 'Akun berhasil dihapus'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus akun'
        });
    }
};
