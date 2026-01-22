// Load relations first
require('../models/relation');

const seedModulLayanan = require('./seedModulLayanan');
const seedPersyaratanDokumen = require('./seedPersyaratanDokumen');
const sequelize = require('../config/database');

async function runAllSeeders() {
    console.log('🌱 Memulai proses seeding database...\n');

    try {
        // Sync database terlebih dahulu
        console.log('⏳ Sinkronisasi database...');
        await sequelize.sync({ force: false });
        console.log('✅ Database berhasil di-sinkronisasi\n');

        // Jalankan seeders secara berurutan
        console.log('1️⃣ Seeding modul layanan...');
        await seedModulLayanan();

        console.log('\n2️⃣ Seeding persyaratan dokumen...');
        await seedPersyaratanDokumen();

        console.log('\n🎉 Semua data berhasil di-seed!');
        
    } catch (error) {
        console.error('\n❌ Error saat menjalankan seeders:', error);
        console.error('Stack trace:', error.stack);
    } finally {
        // Tutup koneksi database
        await sequelize.close();
        console.log('\n🔌 Koneksi database ditutup');
    }
}

// Jalankan jika file ini dijalankan langsung
if (require.main === module) {
    runAllSeeders();
}

module.exports = runAllSeeders;
