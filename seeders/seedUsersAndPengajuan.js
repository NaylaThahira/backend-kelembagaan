const { User, Pengajuan } = require("../models/relation");
const usersData = [
    {
        kabupaten_kota: 'Kab. Padang Pariaman', username: 'padangpariaman', password: 'padangpariaman123', alamat: 'Jl. Raya Pariaman – Padang, Padang Pariaman, Sumatera Barat',
        no_hp: '0751-123456', role: 'kab/kota'
    },
    { kabupaten_kota: 'Kota Bukittinggi', username: 'bukittinggi', password: 'bukittinggi123', alamat: 'Jl. Teuku Umar No.1, Bukittinggi, Sumatera Barat', no_hp: '0752-21333', role: 'kab/kota' },
    {
        kabupaten_kota: 'Kab. Agam', username: 'agam', password: 'agam123', alamat: 'Jl. Kusuma Bhakti, Bukit Gula Bancah, Bukittinggi',
        no_hp: '0752-33369', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kota Padang', username: 'padang', password: 'padang123', alamat: 'Jl. Raya Lubuk Basung, Kabupaten Agam, Sumatera Barat',
        no_hp: '0751-654321', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kab. Solok', username: 'solok', password: 'solok123', alamat: 'Jl. Bagindo Aziz Chan By Pass, Air Pacah, Padang, Sumatera Barat',
        no_hp: '0751-4640800', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kab. Lima Puluh Kota', username: 'limapuluhkota', password: 'limapuluhkota123', alamat: 'Jl. Raya Arosuka, Kabupaten Solok, Sumatera Barat',
        no_hp: '0755-21122', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kota Payakumbuh', username: 'payakumbuh', password: 'payakumbuh123', alamat: 'Jl. Veteran No.43, Payakumbuh, Sumatera Barat',
        no_hp: '0752-92000', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kab. Pasaman', username: 'pasaman', password: 'pasaman123', alamat: 'Jl. Jenderal Sudirman, Lubuk Sikaping, Kabupaten Pasaman',
        no_hp: '0753-31010', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kab. Sijunjung', username: 'sijunjung', password: 'sijunjung123', alamat: 'Jl. M. Yamin, Muaro Sijunjung, Sumatera Barat',
        no_hp: '0754-21045', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kota Solok', username: 'kotasolok', password: 'kotasolok123', alamat: 'Jl. Sudirman No.25, Kota Solok, Sumatera Barat',
        no_hp: '0755-20110', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kab. Dharmasraya', username: 'dharmasraya', password: 'dharmasraya123', alamat: 'Jl. Lintas Sumatera, Pulau Punjung, Dharmasraya',
        no_hp: '0754-40123', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kab. Pasaman Barat', username: 'pasamanbarat', password: 'pasamanbarat123', alamat: 'Jl. Soekarno Hatta, Simpang Empat, Pasaman Barat',
        no_hp: '0753-49000', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kab. Tanah Datar', username: 'tanahdatar', password: 'tanahdatar123', alamat: 'Jl. Sultan Alam Bagagarsyah, Batusangkar, Tanah Datar',
        no_hp: '0752-71100', role: 'kab/kota'
    }
];

async function seedUsersAndPengajuan() {
    try {
        await Pengajuan.destroy({ where: {} });
        const { Op } = require("sequelize");
        await User.destroy({ where: { role: { [Op.ne]: 'admin' } } });
        console.log('   📝 Seeding users kab/kota...');
        const userIdMap = {};
        for (const userData of usersData) {
            const user = await User.create(userData);
            userIdMap[userData.username] = user.id;
        }
        console.log(`   ✅ Berhasil seed ${usersData.length} users kab/kota`);
        const pengajuanTemplates = [
            {
                username: 'kotasolok',
                nomor_registrasi: 'PBU-202501-0001',
                id_modul: 3,
                tanggal_pengajuan: '2025-01-05',
                status_pengajuan: 'Selesai',
                progress_persen: 100,
                catatan_pemohon: 'Permohonan pembentukan UPTD Pengelolaan Sampah',
                file_surat_rekomendasi: '/uploads/rekomendasi/dummy-rekomendasi-uptd-sampah.pdf',
                tanggal_selesai: new Date('2025-01-20T10:30:00')
            },
            {
                username: 'solok',
                nomor_registrasi: 'PBU-202501-0002',
                id_modul: 3,
                tanggal_pengajuan: '2025-01-10',
                status_pengajuan: 'Proses Penandatanganan',
                progress_persen: 85,
                catatan_pemohon: 'Permohonan pembentukan UPTD Perpustakaan Daerah'
            },
            {
                username: 'padangpariaman',
                nomor_registrasi: 'EKL-202501-0001',
                id_modul: 1,
                tanggal_pengajuan: '2025-01-08',
                status_pengajuan: 'Proses Penandatanganan',
                progress_persen: 90,
                catatan_pemohon: 'Evaluasi kelembagaan perangkat daerah'
            },
            {
                username: 'sijunjung',
                nomor_registrasi: 'EKL-202501-0002',
                id_modul: 1,
                tanggal_pengajuan: '2025-01-06',
                status_pengajuan: 'Penyusunan Draft Rekomendasi/Hasil Fasilitasi',
                progress_persen: 60,
                catatan_pemohon: 'Evaluasi untuk restrukturisasi OPD'
            },
            {
                username: 'tanahdatar',
                nomor_registrasi: 'FRA-202501-0001',
                id_modul: 2,
                tanggal_pengajuan: '2025-01-09',
                status_pengajuan: 'Penyusunan Draft Rekomendasi/Hasil Fasilitasi',
                progress_persen: 65,
                catatan_pemohon: 'Fasilitasi Ranperda tentang APBD'
            },
            {
                username: 'bukittinggi',
                nomor_registrasi: 'FRA-202501-0002',
                id_modul: 2,
                tanggal_pengajuan: '2025-01-06',
                status_pengajuan: 'Pelaksanaan Rapat Fasilitasi',
                progress_persen: 45,
                catatan_pemohon: 'Fasilitasi Ranperda tentang Retribusi Daerah'
            },
            {
                username: 'pasamanbarat',
                nomor_registrasi: 'EKL-202501-0003',
                id_modul: 1,
                tanggal_pengajuan: '2025-01-08',
                status_pengajuan: 'Pelaksanaan Rapat Fasilitasi',
                progress_persen: 40,
                catatan_pemohon: 'Evaluasi kelembagaan urusan kesehatan'
            },
            {
                username: 'padang',
                nomor_registrasi: 'FRA-202501-0003',
                id_modul: 2,
                tanggal_pengajuan: '2025-01-09',
                status_pengajuan: 'Penjadwalan Rapat',
                progress_persen: 20,
                catatan_pemohon: 'Fasilitasi Ranperda tentang Pajak Daerah'
            },
            {
                username: 'agam',
                nomor_registrasi: 'EKL-202501-0004',
                id_modul: 1,
                tanggal_pengajuan: '2025-01-07',
                status_pengajuan: 'Perlu Perbaikan',
                progress_persen: 5,
                catatan_pemohon: 'Evaluasi kelembagaan bidang pertanian'
            },
            {
                username: 'padangpariaman',
                nomor_registrasi: 'FRA-202501-0004',
                id_modul: 2,
                tanggal_pengajuan: '2025-01-04',
                status_pengajuan: 'Perlu Perbaikan',
                progress_persen: 5,
                catatan_pemohon: 'Fasilitasi Ranperda tentang Tata Ruang'
            },
            {
                username: 'limapuluhkota',
                nomor_registrasi: 'EKL-202501-0005',
                id_modul: 1,
                tanggal_pengajuan: '2025-01-12',
                status_pengajuan: 'Menunggu Verifikasi',
                progress_persen: 0,
                catatan_pemohon: 'Permohonan evaluasi kelembagaan dinas pendidikan'
            },
            {
                username: 'payakumbuh',
                nomor_registrasi: 'PBU-202501-0003',
                id_modul: 3,
                tanggal_pengajuan: '2025-01-13',
                status_pengajuan: 'Menunggu Verifikasi',
                progress_persen: 0,
                catatan_pemohon: 'Pembentukan UPTD Puskesmas'
            },
            {
                username: 'pasaman',
                nomor_registrasi: 'EKL-202501-0006',
                id_modul: 1,
                tanggal_pengajuan: '2025-01-14',
                status_pengajuan: 'Menunggu Verifikasi',
                progress_persen: 0,
                catatan_pemohon: 'Evaluasi kelembagaan bidang perhubungan'
            },
            {
                username: 'dharmasraya',
                nomor_registrasi: 'FRA-202501-0005',
                id_modul: 2,
                tanggal_pengajuan: '2025-01-15',
                status_pengajuan: 'Menunggu Verifikasi',
                progress_persen: 0,
                catatan_pemohon: 'Fasilitasi Ranperda tentang Pengelolaan Pasar'
            },
            {
                username: 'padang',
                nomor_registrasi: 'PBU-202501-0004',
                id_modul: 3,
                tanggal_pengajuan: '2025-01-16',
                status_pengajuan: 'Menunggu Verifikasi',
                progress_persen: 0,
                catatan_pemohon: 'Pembentukan UPTD Rumah Potong Hewan'
            }
        ];
        console.log('   📝 Seeding pengajuan...');
        for (const template of pengajuanTemplates) {
            const { username, ...pengajuanData } = template;
            const id_user = userIdMap[username];

            if (!id_user) {
                console.warn(`Warning: User ${username} not found, skipping pengajuan`);
                continue;
            }

            await Pengajuan.create({
                ...pengajuanData,
                id_user: id_user,
                created_at: new Date(pengajuanData.tanggal_pengajuan),
                updated_at: new Date()
            });
        }
        console.log(`   ✅ Berhasil seed ${pengajuanTemplates.length} pengajuan`);

    } catch (error) {
        console.error("Error seeding users and pengajuan:", error);
        throw error;
    }
}

module.exports = seedUsersAndPengajuan;
