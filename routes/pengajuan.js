const express = require("express");
const router = express.Router();
const pengajuanController = require("../controllers/pengajuanController");

// Route untuk modul layanan
router.get("/modul-layanan", pengajuanController.getAllModulLayanan);

// Route untuk persyaratan dokumen berdasarkan modul
router.get( "/persyaratan/:id_modul", pengajuanController.getPersyaratanByModul);

router.get("/user/:id_user", pengajuanController.getPengajuanByUser);
// Route untuk create pengajuan

router.post("/create", pengajuanController.createPengajuan);

module.exports = router;
