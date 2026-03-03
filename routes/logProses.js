const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getAllProses, getLogByPengajuan, addLogProses } = require('../controllers/logProsesController');

const buktiDir = path.join(__dirname, '../uploads/bukti-proses');
if (!fs.existsSync(buktiDir)) fs.mkdirSync(buktiDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, buktiDir),
    filename: (req, file, cb) => {
        const ts = Date.now();
        const original = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const safe = original.replace(/\s+/g, '_');
        const ext = path.extname(safe);
        cb(null, `bukti_${ts}_${Math.round(Math.random() * 1e6)}${ext}`);
    }
});

const uploadBukti = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }
});

router.get('/proses', getAllProses);
router.get('/log/:id_pengajuan', getLogByPengajuan);
router.post('/log/:id_pengajuan', uploadBukti.array('bukti'), addLogProses);
router.get('/download', (req, res) => {
    const relPath = req.query.path;
    if (!relPath) return res.status(400).json({ success: false, message: 'Parameter path wajib diisi' });
    const normalized = relPath.startsWith('/') ? relPath : '/' + relPath;
    const uploadsRoot = path.resolve(__dirname, '../uploads');
    const filePath = path.resolve(path.join(__dirname, '..', normalized));
    if (!filePath.startsWith(uploadsRoot + path.sep) && filePath !== uploadsRoot) {
        return res.status(403).json({ success: false, message: 'Akses ditolak' });
    }
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'File tidak ditemukan' });
    }

    const filename = path.basename(filePath);
    res.download(filePath, filename, (err) => {
        if (err && !res.headersSent) {
            console.error('Download error:', err);
            res.status(500).json({ success: false, message: 'Gagal mengunduh file' });
        }
    });
});

module.exports = router;
