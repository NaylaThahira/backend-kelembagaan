const { CatatanRevisi } = require('../models/relation');

async function seedCatatanRevisi() {
    try {
        await CatatanRevisi.destroy({ where: {} });
        console.log('Berhasil membersihkan tabel catatan_revisi');
    } catch (error) {
        console.error('Error seeding catatan revisi:', error);
        throw error;
    }
}

module.exports = seedCatatanRevisi;
