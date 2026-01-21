const express = require("express");
const router = express.Router();
const upload = require("../config/upload");

// Upload single file
router.post("/single", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Tidak ada file yang diupload",
            });
        }

        const fileUrl = `/uploads/documents/${req.file.filename}`;

        res.status(200).json({
            success: true,
            message: "File berhasil diupload",
            data: {
                id_persyaratan: req.body.id_persyaratan, // dari form
                nama_file: req.file.originalname,
                path_file: fileUrl,
                size: req.file.size,
                mimetype: req.file.mimetype,
            },
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengupload file",
            error: error.message,
        });
    }
});

// Upload multiple files (max 10)
router.post("/multiple", upload.array("files", 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Tidak ada file yang diupload",
            });
        }

        const uploadedFiles = req.files.map((file) => ({
            nama_file: file.originalname,
            path_file: `/uploads/documents/${file.filename}`,
            size: file.size,
            mimetype: file.mimetype,
        }));

        res.status(200).json({
            success: true,
            message: `${req.files.length} file berhasil diupload`,
            data: uploadedFiles,
        });
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengupload files",
            error: error.message,
        });
    }
});

module.exports = router;
