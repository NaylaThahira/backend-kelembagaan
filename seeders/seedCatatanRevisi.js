const { CatatanRevisi } = require("../models/relation");
const catatanRevisiData = [
    {
        id_pengajuan: 9,
        catatan: 'Mohon lengkapi dokumen berikut:\n\n1. Surat Rekomendasi dari Kementerian Teknis belum dilampirkan\n2. ABK yang sudah disahkan kepala daerah tidak terbaca dengan jelas, mohon upload ulang dengan kualitas lebih baik\n3. Matriks pengelompokan urusan belum sesuai format yang ditentukan\n\nSilakan perbaiki dan upload kembali.',
        created_by: 'admin',
        created_at: new Date('2025-01-15')
    },
    {
        id_pengajuan: 10,
        catatan: 'Draft Ranperda belum sesuai template. Mohon gunakan template resmi dari Biro Organisasi.',
        created_by: 'admin',
        created_at: new Date('2025-01-10')
    },
    {
        id_pengajuan: 10,
        catatan: 'Setelah dilakukan verifikasi, ditemukan beberapa hal yang perlu diperbaiki:\n\n1. Draft Ranperda/Ranperkada yang diajukan tidak sesuai dengan template yang ditentukan. Mohon gunakan template resmi dari Biro Organisasi.\n\n2. Surat Hasil Harmonisasi dari Kanwil Hukum dan HAM yang dilampirkan sudah kadaluarsa (lebih dari 6 bulan). Mohon ajukan harmonisasi ulang dan lampirkan hasil terbaru.\n\n3. Pada bagian konsideran, terdapat inkonsistensi dengan peraturan perundang-undangan yang lebih tinggi. Mohon disesuaikan dengan UU No. 23 Tahun 2014 tentang Pemerintahan Daerah.\n\n4. Format penomoran pasal tidak konsisten. Mohon diperbaiki sesuai dengan pedoman teknis penyusunan peraturan daerah.\n\nSilakan lakukan perbaikan dan unggah kembali dokumen yang sudah diperbaiki melalui sistem.',
        created_by: 'admin',
        created_at: new Date('2025-01-14')
    }
];

async function seedCatatanRevisi() {
    try {
        await CatatanRevisi.destroy({ where: {} });
        for (const catatan of catatanRevisiData) {
            await CatatanRevisi.create(catatan);
        }
        console.log(`Berhasil seed ${catatanRevisiData.length} catatan revisi`);
    } catch (error) {
        console.error("Error seeding catatan revisi:", error);
        throw error;
    }
}

module.exports = seedCatatanRevisi;
