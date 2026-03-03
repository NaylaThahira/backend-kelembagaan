// Load relations first
require('../models/relation');

const seedAdmin = require('./seedAdmin');
const seedModulLayanan = require('./seedModulLayanan');
const seedPersyaratanDokumen = require('./seedPersyaratanDokumen');
const seedUsersAndPengajuan = require('./seedUsersAndPengajuan');
const seedCatatanRevisi = require('./seedCatatanRevisi');
const seedProses = require('./seedProses');
const sequelize = require('../config/database');

async function runAllSeeders() {
    console.log('Memulai proses seeding database...\n');

    try {
        console.log('⏳ Sinkronisasi database...');
        await sequelize.sync({ force: false });
        console.log('✅ Database berhasil di-sinkronisasi\n');

        console.log('1️⃣  Seeding admin...');
        await seedAdmin();

        console.log('\n2️⃣  Seeding modul layanan...');
        await seedModulLayanan();

        console.log('\n3️⃣  Seeding persyaratan dokumen...');
        await seedPersyaratanDokumen();

        console.log('\n4️⃣  Seeding users dan pengajuan...');
        await seedUsersAndPengajuan();

        console.log('\n5️⃣  Seeding catatan revisi...');
        await seedCatatanRevisi();

        console.log('\n6️⃣  Seeding proses...');
        await seedProses();

        console.log('\n🎉 Semua data berhasil di-seed!');

    } catch (error) {
        console.error('\nError saat menjalankan seeders:', error);
        console.error('Stack trace:', error.stack);
    } finally {
        await sequelize.close();
        console.log('\n🔌 Koneksi database ditutup');
    }
}

if (require.main === module) {
    runAllSeeders();
}

module.exports = runAllSeeders;
