const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Buat folder uploads/profiles jika belum ada
const uploadDir = path.join(__dirname, "../uploads/profiles");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📁 Created uploads/profiles directory");
}

// Konfigurasi storage untuk profile photos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Format: userid_timestamp.ext
        const timestamp = Date.now();
        const userId = req.user.id;
        const ext = path.extname(file.originalname);
        const uniqueName = `user_${userId}_${timestamp}${ext}`;
        cb(null, uniqueName);
    },
});

// Filter file type - hanya gambar
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp"
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Format file tidak didukung. Hanya JPG, PNG, GIF, dan WEBP yang diperbolehkan."
            ),
            false
        );
    }
};

// Setup multer untuk profile
const uploadProfile = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // Max 2MB
    },
});

module.exports = uploadProfile;
