const express = require("express");
const router = express.Router();
const pengajuanController = require("../controllers/pengajuanController");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/rekomendasi/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'rekomendasi-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadRekomendasi = multer({ storage: storage });


router.get("/modul-layanan", pengajuanController.getAllModulLayanan);
router.get("/persyaratan/:id_modul", pengajuanController.getPersyaratanByModul);

router.get("/user/:id_user", pengajuanController.getPengajuanByUser);

router.post("/create", pengajuanController.createPengajuan);

router.get("/all", pengajuanController.getAllPengajuan);
router.get("/status/:status", pengajuanController.getPengajuanByStatus);
router.put("/update/:id_pengajuan", pengajuanController.updatePengajuanStatus);

router.get("/dokumen/:id_pengajuan", pengajuanController.getDokumenByPengajuan);

router.get("/catatan-revisi/:id_pengajuan", pengajuanController.getCatatanRevisi);

router.get("/:id", pengajuanController.getPengajuanById);

router.put("/revisi/:id", pengajuanController.submitRevisi);

router.post("/selesaikan/:id", uploadRekomendasi.single('file_rekomendasi'), pengajuanController.selesaikanPengajuan);

module.exports = router;
