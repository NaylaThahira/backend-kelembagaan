const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Buat folder uploads jika belum ada
const uploadDir = path.join(__dirname, "../uploads/documents");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📁 Created uploads/documents directory");
}

// Konfigurasi storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Format: originalname_timestamp.ext
        const timestamp = Date.now();
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const safeName = originalName.replace(/\s+/g, "_"); // ganti spasi dengan underscore
        const ext = path.extname(safeName);
        const nameWithoutExt = path.basename(safeName, ext);
        const uniqueName = `${nameWithoutExt}_${timestamp}${ext}`;
        cb(null, uniqueName);
    },
});

// Filter file type
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const allowedExts = [".pdf", ".doc", ".docx", ".xls", ".xlsx"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedMimes.includes(file.mimetype) || allowedExts.includes(ext)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Format file tidak didukung. Hanya PDF, DOC, DOCX, XLS, XLSX yang diperbolehkan."
            ),
            false
        );
    }
};

// Setup multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // Max 10MB
    },
});

module.exports = upload;
