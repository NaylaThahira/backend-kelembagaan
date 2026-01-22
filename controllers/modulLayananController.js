const { ModulLayanan, PersyaratanDokumen } = require("../models/relation");

// ===========================
// GET ALL MODUL LAYANAN
// ===========================
// Contoh: GET /api/modul-layanan
// Menampilkan semua modul layanan DENGAN persyaratan dokumennya (include)
exports.getAllModulLayanan = async (req, res) => {
    try {
        const moduls = await ModulLayanan.findAll({
            include: [
                {
                    model: PersyaratanDokumen,
                    as: "persyaratan", // Sesuai dengan alias di relation.js
                },
            ],
        });

        res.status(200).json({
            success: true,
            message: "Data modul layanan berhasil diambil",
            data: moduls,
        });
    } catch (error) {
        console.error("Error fetching modul layanan:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data modul layanan",
            error: error.message,
        });
    }
};

// ===========================
// GET MODUL LAYANAN BY ID
// ===========================
// Contoh: GET /api/modul-layanan/1
// Menampilkan 1 modul layanan DENGAN persyaratan dokumennya
exports.getModulLayananById = async (req, res) => {
    try {
        const { id } = req.params;

        const modul = await ModulLayanan.findByPk(id, {
            include: [
                {
                    model: PersyaratanDokumen,
                    as: "persyaratan",
                },
            ],
        });

        if (!modul) {
            return res.status(404).json({
                success: false,
                message: `Modul layanan dengan ID ${id} tidak ditemukan`,
            });
        }

        res.status(200).json({
            success: true,
            message: "Data modul layanan berhasil diambil",
            data: modul,
        });
    } catch (error) {
        console.error("Error fetching modul layanan by ID:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data modul layanan",
            error: error.message,
        });
    }
};

// ===========================
// GET ALL MODUL LAYANAN (Tanpa Relasi)
// ===========================
// Contoh: GET /api/modul-layanan/simple
// Menampilkan semua modul layanan TANPA persyaratan dokumennya
exports.getAllModulLayananSimple = async (req, res) => {
    try {
        const moduls = await ModulLayanan.findAll();

        res.status(200).json({
            success: true,
            message: "Data modul layanan berhasil diambil (simple)",
            data: moduls,
        });
    } catch (error) {
        console.error("Error fetching modul layanan:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data modul layanan",
            error: error.message,
        });
    }
};
