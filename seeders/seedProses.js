const Proses = require("../models/Proses");

const prosesData = [
    { nama_proses: 'Penjadwalan Rapat' },
    { nama_proses: 'Pelaksanaan Rapat Fasilitasi' },
    { nama_proses: 'Penyusunan Draft Rekomendasi/Hasil Fasilitasi' },
    { nama_proses: 'Proses Penandatanganan' },
];

async function seedProses() {
    try {
        await Proses.destroy({ where: {} });
        for (const proses of prosesData) {
            await Proses.create(proses);
        }
        console.log("Berhasil seed data proses");
    } catch (error) {
        console.error("Error seeding proses:", error);
        throw error;
    }
}

module.exports = seedProses;
