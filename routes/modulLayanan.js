const express = require("express");
const router = express.Router();
const modulLayananController = require("../controllers/modulLayananController");

// GET /api/modul-layanan - Ambil semua modul DENGAN persyaratan dokumen (include relasi)
router.get("/", modulLayananController.getAllModulLayanan);

// GET /api/modul-layanan/simple - Ambil semua modul TANPA persyaratan dokumen
router.get("/simple", modulLayananController.getAllModulLayananSimple);

// GET /api/modul-layanan/:id - Ambil 1 modul by ID DENGAN persyaratan dokumen
router.get("/:id", modulLayananController.getModulLayananById);

module.exports = router;
