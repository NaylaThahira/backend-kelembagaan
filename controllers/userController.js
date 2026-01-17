const User = require('../models/User');

// Get all users (pemohon only, not admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { role: 'pemohon' },
            attributes: ['id', 'name', 'email', 'institution', 'created_at'],
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
        const { name, email, password, institution } = req.body;

        // Validation
        if (!name || !email || !password || !institution) {
            return res.status(400).json({
                success: false,
                message: 'Semua field wajib diisi'
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah terdaftar'
            });
        }

        // Create user (password will be automatically hashed by beforeCreate hook)
        const newUser = await User.create({
            name,
            email,
            password,
            institution,
            role: 'pemohon'
        });

        res.status(201).json({
            success: true,
            message: 'Akun berhasil dibuat',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                institution: newUser.institution
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
        const { name, email, password, institution } = req.body;

        // Find user
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        // Check if email is already used by another user
        if (email && email !== user.email) {
            const emailExists = await User.findOne({
                where: {
                    email,
                    id: { [require('sequelize').Op.ne]: id }
                }
            });

            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email sudah digunakan oleh pengguna lain'
                });
            }
        }

        // Prepare update data
        const updateData = {
            name,
            email,
            institution
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
