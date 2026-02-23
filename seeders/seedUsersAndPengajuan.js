const { User, Pengajuan } = require("../models/relation");
const usersData = [
    {
        kabupaten_kota: 'Kabupaten Padang Pariaman', username: 'padangpariaman', password: 'padangpariaman123', alamat: 'Jl. Imam Bonjol No. 44, Kecamatan Pariaman Tengah, Pariaman, Kota Pariaman, Sumatera Barat',
        no_hp: '(0751) 92202', role: 'kab/kota'
    },
    { kabupaten_kota: 'Kota Bukittinggi', username: 'bukittinggi', password: 'bukittinggi123', alamat: ' Jl. Kusuma Bhakti Bukit Gula Bancah Bukittinggi ', no_hp: '(0752) 33369 ', role: 'kab/kota' },
    {
        kabupaten_kota: 'Kabupaten Agam', username: 'agam', password: 'agam123', alamat: 'Jl. Sudirman No. 1 Lubuk Basung, Kabupaten Agam, Sumatera Barat',
        no_hp: '(0752) 76301', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kota Padang', username: 'padang', password: 'padang123', alamat: 'Jalan Jenderal Sudirman No. 51, Kota Padang, Sumatera Barat',
        no_hp: '0751-654321', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kota Padang Panjang', username: 'padangpanjang', password: 'padangpanjang123', alamat: 'Jl. Sutan Syahrir No. 178, Kota Padang Panjang, Sumatera Barat',
        no_hp: '(0752) 82200', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Solok', username: 'kabupatensolok', password: 'kabupatensolok123', alamat: 'Jl. Bagindo Aziz Chan By Pass, Air Pacah, Padang, Sumatera Barat',
        no_hp: '0751-4640800', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Lima Puluh Kota', username: 'limapuluhkota', password: 'limapuluhkota123', alamat: 'Bukik Limau, Sarilamak, Jalan Raya Negara KM.10 Kecamatan Harau, Kabupaten Lima Puluh Kota, Sumatera Barat',
        no_hp: '(0752) 92065', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kota Payakumbuh', username: 'payakumbuh', password: 'payakumbuh123', alamat: ' Jl. Jend. Sudirman No. 17, Kota Payakumbuh, Sumatera Barat',
        no_hp: '(0752) 92201', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Pasaman', username: 'pasaman', password: 'pasaman123', alamat: 'JL. Jend. Sudirman, No. 40, Kompleks Kantor Bupati Pasaman, Kabupaten Pasaman, Sumatera Barat',
        no_hp: ' (0753) 20020', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Sijunjung', username: 'sijunjung', password: 'sijunjung123', alamat: 'Jl. M. Yamin, Muaro Sijunjung, Sumatera Barat',
        no_hp: '0754-21045', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kota Solok', username: 'kotasolok', password: 'kotasolok123', alamat: 'Jl. Lubuk Sikarah No.89, Ix Korong, Lubuk Sikarah, Kota Solok, Sumatera Barat',
        no_hp: '(0755) 20084', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Dharmasraya', username: 'dharmasraya', password: 'dharmasraya123', alamat: 'Jl. Lintas Sumatra Km. 5 Sikabau, Sungai Dareh, Kec. Pulau Punjung, Kabupaten Dharmasraya ',
        no_hp: '(0754) 451548', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Pasaman Barat', username: 'pasamanbarat', password: 'pasamanbarat123', alamat: 'Jl. Soekarno Hatta, Simpang Empat, Pasaman Barat',
        no_hp: '0753-49000', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Tanah Datar', username: 'tanahdatar', password: 'tanahdatar123', alamat: ' Jl. Sultan Alam Bagagarsyah, Batusangkar, Kabupaten Tanah Datar, Sumatera Barat',
        no_hp: '(0752) 71001', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Kepulauan Mentawai', username: 'kepulauanmentawai', password: 'kepulauanmentawai123', alamat: 'Sipora Jaya, North Sipora, Kepulauan Mentawai, West Sumatra',
        no_hp: '(0759) 320050', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Pesisir Selatan', username: 'pesisirselatan', password: 'pesisirselatan123', alamat: 'Jl. Agus Salim, Painan, Kec. Iv Jurai, Kabupaten Pesisir Selatan, Sumatera Barat ',
        no_hp: '(0756) 21200', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kabupaten Solok Selatan', username: 'solokselatan', password: 'solokselatan123', alamat: 'Jl.Raya Timbulun – Padang Aro, Kec. Sangir, Kabupaten Solok Selatan, Sumatera Barat',
        no_hp: '(0755) 583329', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kota Sawahlunto', username: 'sawahlunto', password: 'sawahlunto123', alamat: 'Jl. Raya Sawahlunto, Kec. Sawahlunto, Kabupaten Sawahlunto, Sumatera Barat',
        no_hp: '(0751) 4640800', role: 'kab/kota'
    },
    {
        kabupaten_kota: 'Kota Pariaman', username: 'pariaman', password: 'pariaman123', alamat: 'Jl. Imam Bonjol No. 44, Kecamatan Pariaman Tengah, Pariaman, Kota Pariaman, Sumatera Barat',
        no_hp: '(0751) 4640800', role: 'kab/kota'
    }

];

async function seedUsersAndPengajuan() {
    try {
        await Pengajuan.destroy({ where: {} });
        const { Op } = require("sequelize");
        await User.destroy({ where: { role: { [Op.ne]: 'admin' } } });

        console.log('   📝 Seeding users kab/kota...');
        for (const userData of usersData) {
            await User.create(userData);
        }
        console.log(`   ✅ Berhasil seed ${usersData.length} users kab/kota`);
        console.log('   ℹ️  Tidak ada data dummy pengajuan yang di-seed');

    } catch (error) {
        console.error("Error seeding users and pengajuan:", error);
        throw error;
    }
}

module.exports = seedUsersAndPengajuan;
