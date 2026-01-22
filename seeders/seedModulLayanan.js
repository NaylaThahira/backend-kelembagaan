const { ModulLayanan } = require("../models/relation");

const modulLayananData = [
    {
        id_modul: 1,
        nama_modul: "Evaluasi Kelembagaan Perangkat Daerah",
        deskripsi: "Evaluasi kelembagaan perangkat daerah atau pemerintah daerah",
    },
    {
        id_modul: 2,
        nama_modul: "Fasilitas Ranperda/Ranperkada",
        deskripsi: "Fasilitas penyusunan rancangan peraturan daerah atau peraturan kepala daerah",
    },
    {
        id_modul: 3,
        nama_modul: "Pembentukan UPTD",
        deskripsi: "Pembentukan Unit Pelaksana Teknis Daerah",
    },
];

async function seedModulLayanan() {
    try {
        // Hapus data lama
        await ModulLayanan.destroy({ where: {} });

        // Insert data modul layanan
        for (const modul of modulLayananData) {
            await ModulLayanan.create(modul);
        }

        console.log("✅ Berhasil seed 3 modul layanan");
    } catch (error) {
        console.error("❌ Error seeding modul layanan:", error);
        throw error;
    }
}

module.exports = seedModulLayanan;
