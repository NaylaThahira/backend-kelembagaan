const { PersyaratanDokumen } = require("../models/relation");

const persyaratanDokumenData = [
    // Persyaratan untuk Modul 1: Evaluasi Kelembagaan Perangkat Daerah
    {
        id_modul: 1,
        nama_dokumen: "Surat Pengantar dari Bupati/Walikota/Sekretaris Daerah",
        format_file: "PDF",
        wajib: true,
    },
    {
        id_modul: 1,
        nama_dokumen: "Dokumen Struktur Organisasi Perangkat Daerah",
        format_file: "PDF, DOCX",
        wajib: true,
    },
    {
        id_modul: 1,
        nama_dokumen: "Peraturan Daerah tentang Perangkat Daerah",
        format_file: "PDF",
        wajib: true,
    },
    {
        id_modul: 1,
        nama_dokumen: "Data Kepegawaian Perangkat Daerah",
        format_file: "PDF, XLSX",
        wajib: false,
    },

    // Persyaratan untuk Modul 2: Fasilitas Ranperda/Ranperkada
    {
        id_modul: 2,
        nama_dokumen: "Surat Pengantar dari Bupati/Walikota/Sekretaris Daerah",
        format_file: "PDF",
        wajib: true,
    },
    {
        id_modul: 2,
        nama_dokumen: "Draft Ranperda/Ranperkada",
        format_file: "PDF, DOCX",
        wajib: true,
    },
    {
        id_modul: 2,
        nama_dokumen: "Naskah Akademik (jika ada)",
        format_file: "PDF, DOCX",
        wajib: false,
    },
    {
        id_modul: 2,
        nama_dokumen: "Dokumen Pendukung Lainnya",
        format_file: "PDF, DOCX",
        wajib: false,
    },

    // Persyaratan untuk Modul 3: Pembentukan UPTD
    {
        id_modul: 3,
        nama_dokumen: "Surat Pengantar dari Bupati/Walikota/Sekretaris Daerah",
        format_file: "PDF",
        wajib: true,
    },
    {
        id_modul: 3,
        nama_dokumen: "Draft Peraturan Bupati/Walikota tentang UPTD",
        format_file: "PDF, DOCX",
        wajib: true,
    },
    {
        id_modul: 3,
        nama_dokumen: "Kajian Kelayakan Pembentukan UPTD",
        format_file: "PDF, DOCX",
        wajib: true,
    },
    {
        id_modul: 3,
        nama_dokumen: "Analisis Beban Kerja",
        format_file: "PDF, XLSX",
        wajib: false,
    },
];

async function seedPersyaratanDokumen() {
    try {
        // Hapus data lama
        await PersyaratanDokumen.destroy({ where: {} });

        // Insert data persyaratan dokumen
        for (const persyaratan of persyaratanDokumenData) {
            await PersyaratanDokumen.create(persyaratan);
        }

        console.log("✅ Berhasil seed 12 persyaratan dokumen");
    } catch (error) {
        console.error("❌ Error seeding persyaratan dokumen:", error);
        throw error;
    }
}

module.exports = seedPersyaratanDokumen;
