const User = require('../models/User');
const bcrypt = require('bcrypt');

// Update profile user yang sedang login
exports.updateProfile = async (req, res) => {
    try {
        console.log('=== PROFILE UPDATE REQUEST ===');
        console.log('User ID:', req.user?.id);
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        console.log('Content-Type:', req.headers['content-type']);

        const userId = req.user.id; // dari middleware authenticate
        const { username, alamat, no_hp } = req.body;

        console.log('📝 Update profile request:', { userId, username, alamat, no_hp, hasFile: !!req.file });

        // Find user
        const user = await User.findByPk(userId);
        if (!user) {
            console.log('❌ User not found:', userId);
            return res.status(404).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        console.log('✅ User found:', user.username);

        // Check if username is already used by another user
        if (username && username !== user.username) {
            const usernameExists = await User.findOne({
                where: {
                    username,
                    id: { [require('sequelize').Op.ne]: userId }
                }
            });

            if (usernameExists) {
                console.log('❌ Username already exists:', username);
                return res.status(400).json({
                    success: false,
                    message: 'Username sudah digunakan oleh pengguna lain'
                });
            }
        }

        // Prepare update data
        const updateData = {};

        // Update fields only if provided
        if (username !== undefined && username.trim() !== '') {
            updateData.username = username;
        }
        if (alamat !== undefined) {
            updateData.alamat = alamat;
        }
        if (no_hp !== undefined) {
            updateData.no_hp = no_hp;
        }

        // Update profile photo if uploaded
        if (req.file) {
            updateData.foto_profile = req.file.filename;
        }

        console.log('💾 Update data:', updateData);

        // Update user
        await user.update(updateData);
        console.log('✅ Database updated');

        // Get updated user data
        const updatedUser = await User.findByPk(userId, {
            attributes: ['id', 'username', 'kabupaten_kota', 'alamat', 'no_hp', 'role', 'foto_profile']
        });

        console.log('✅ Profile updated successfully:', updatedUser.toJSON());

        const response = {
            success: true,
            message: 'Profile berhasil diperbarui',
            data: updatedUser
        };

        console.log('📤 Sending response:', response);
        res.json(response);
        console.log('=== PROFILE UPDATE COMPLETE ===');

    } catch (error) {
        console.error('❌ Error updating profile:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui profile',
            error: error.message
        });
    }
};


// Update password user yang sedang login
exports.updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password lama dan password baru wajib diisi'
            });
        }

        // Find user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        // Verify old password
        const isPasswordValid = await user.comparePassword(oldPassword);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Password lama tidak sesuai'
            });
        }

        // Validate new password
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password baru minimal 6 karakter'
            });
        }

        // Update password (will be hashed by beforeUpdate hook)
        await user.update({ password: newPassword });

        res.json({
            success: true,
            message: 'Password berhasil diperbarui'
        });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui password'
        });
    }
};
