const sequelize = require("../config/database");
const { ModulLayanan, PersyaratanDokumen } = require("../models/relation");

const seedModulLayananData = async () => {
    try {
        console.log("🌱 Starting to seed modul layanan and persyaratan dokumen...");

        // Hapus data lama terlebih dahulu
        await PersyaratanDokumen.destroy({ where: {} });
        await ModulLayanan.destroy({ where: {} });
        console.log("✅ Cleared old data");

        // 1. Evaluasi Kelembagaan Perangkat Daerah (ID = 1)
        const modulEvaluasi = await ModulLayanan.create({
            id_modul: 1,
            nama_modul: "Evaluasi Kelembagaan Perangkat Daerah",
            deskripsi:
                "Evaluasi kelembagaan perangkat daerah atau pemerintah daerah",
        });

        await PersyaratanDokumen.bulkCreate([
            {
                id_modul: modulEvaluasi.id_modul,
                nama_dokumen: "Surat Pengantar dari Bupati/Walikota/Sekretaris Daerah",
                format_file: "PDF",
                wajib: true,
            },
            {
                id_modul: modulEvaluasi.id_modul,
                nama_dokumen: "Dokumen Struktur Organisasi Perangkat Daerah",
                format_file: "PDF, DOCX",
                wajib: true,
            },
            {
                id_modul: modulEvaluasi.id_modul,
                nama_dokumen: "Peraturan Daerah tentang Perangkat Daerah",
                format_file: "PDF",
                wajib: true,
            },
            {
                id_modul: modulEvaluasi.id_modul,
                nama_dokumen: "Data Kepegawaian Perangkat Daerah",
                format_file: "PDF, XLSX",
                wajib: false,
            },
        ]);

        console.log("✅ Seeded: Evaluasi Kelembagaan Perangkat Daerah (id=1)");

        // 2. Fasilitas Ranperda/Ranperkada (ID = 2)
        const modulRanperda = await ModulLayanan.create({
            id_modul: 2,
            nama_modul: "Fasilitas Ranperda/Ranperkada",
            deskripsi:
                "Fasilitas penyusunan rancangan peraturan daerah atau peraturan kepala daerah",
        });

        await PersyaratanDokumen.bulkCreate([
            {
                id_modul: modulRanperda.id_modul,
                nama_dokumen: "Surat Pengantar dari Bupati/Walikota/Sekretaris Daerah",
                format_file: "PDF",
                wajib: true,
            },
            {
                id_modul: modulRanperda.id_modul,
                nama_dokumen: "Draft Ranperda/Ranperkada",
                format_file: "PDF, DOCX",
                wajib: true,
            },
            {
                id_modul: modulRanperda.id_modul,
                nama_dokumen: "Naskah Akademik (jika ada)",
                format_file: "PDF, DOCX",
                wajib: false,
            },
            {
                id_modul: modulRanperda.id_modul,
                nama_dokumen: "Dokumen Pendukung Lainnya",
                format_file: "PDF, DOCX",
                wajib: false,
            },
        ]);

        console.log("✅ Seeded: Fasilitas Ranperda/Ranperkada (id=2)");

        // 3. Pembentukan UPTD (ID = 3)
        const modulUPTD = await ModulLayanan.create({
            id_modul: 3,
            nama_modul: "Pembentukan UPTD",
            deskripsi: "Pembentukan Unit Pelaksana Teknis Daerah",
        });

        await PersyaratanDokumen.bulkCreate([
            {
                id_modul: modulUPTD.id_modul,
                nama_dokumen: "Surat Pengantar dari Bupati/Walikota/Sekretaris Daerah",
                format_file: "PDF",
                wajib: true,
            },
            {
                id_modul: modulUPTD.id_modul,
                nama_dokumen: "Draft Peraturan Bupati/Walikota tentang UPTD",
                format_file: "PDF, DOCX",
                wajib: true,
            },
            {
                id_modul: modulUPTD.id_modul,
                nama_dokumen: "Kajian Kelayakan Pembentukan UPTD",
                format_file: "PDF, DOCX",
                wajib: true,
            },
            {
                id_modul: modulUPTD.id_modul,
                nama_dokumen: "Analisis Beban Kerja",
                format_file: "PDF, XLSX",
                wajib: false,
            },
        ]);

        console.log("✅ Seeded: Pembentukan UPTD (id=3)");

        console.log("🎉 Successfully seeded all modul layanan and persyaratan dokumen!");
        console.log("\nUrutan ID:");
        console.log("  1 = Evaluasi Kelembagaan Perangkat Daerah");
        console.log("  2 = Fasilitas Ranperda/Ranperkada");
        console.log("  3 = Pembentukan UPTD");
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        throw error;
    }
};

// Jalankan seeder jika file ini dijalankan langsung
if (require.main === module) {
    sequelize
        .authenticate()
        .then(() => {
            console.log("✅ Database connection established");
            return seedModulLayananData();
        })
        .then(() => {
            console.log("✅ Seeding completed");
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ Seeding failed:", error);
            process.exit(1);
        });
}

module.exports = seedModulLayananData;
