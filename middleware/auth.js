const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Token tidak ditemukan. Silakan login terlebih dahulu'
            });
        }
        const token = authHeader.substring(7);

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
            kabupaten_kota: decoded.kabupaten_kota
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token telah kadaluarsa. Silakan login kembali'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token tidak valid'
            });
        }

        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat verifikasi token'
        });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Akses ditolak. Hanya admin yang dapat mengakses resource ini'
        });
    }
    next();
};

exports.isPemohon = (req, res, next) => {
    if (req.user.role !== 'kab/kota') {
        return res.status(403).json({
            success: false,
            message: 'Akses ditolak. Hanya kabupaten/kota yang dapat mengakses resource ini'
        });
    }
    next();
};
