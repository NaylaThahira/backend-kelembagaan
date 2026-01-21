const {
    Pengajuan,
    ModulLayanan,
    PersyaratanDokumen,
    Dokumen,
} = require("../models/relation");
const sequelize = require("../config/database");

// Helper - Generate nomor registrasi otomatis
const generateNomorRegistrasi = async (id_modul) => {
    try {
        const modul = await ModulLayanan.findByPk(id_modul);
        if (!modul) {
            throw new Error("Modul tidak ditemukan");
        }

        // Ambil kode modul (3 huruf pertama dari setiap kata)
        const kodeModul = modul.nama_modul
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .substring(0, 3);

        // Tahun dan bulan
        const now = new Date();
        const tahun = now.getFullYear();
        const bulan = String(now.getMonth() + 1).padStart(2, "0");

        // Hitung jumlah pengajuan bulan ini
        const count = await Pengajuan.count({
            where: {
                id_modul: id_modul,
            },
        });

        // Format: KODE-YYYYMM-XXXX
        const urutan = String(count + 1).padStart(4, "0");
        const nomorRegistrasi = `${kodeModul}-${tahun}${bulan}-${urutan}`;

        return nomorRegistrasi;
    } catch (error) {
        console.error("Error generating nomor registrasi:", error);
        throw error;
    }
};

// GET - Mengambil semua modul layanan
const getAllModulLayanan = async (req, res) => {
    try {
        const modulLayanan = await ModulLayanan.findAll({
            attributes: ["id_modul", "nama_modul", "deskripsi"],
            order: [["id_modul", "ASC"]],
        });

        res.status(200).json({
            success: true,
            data: modulLayanan,
        });
    } catch (error) {
        console.error("Error fetching modul layanan:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data modul layanan",
            error: error.message,
        });
    }
};

// GET - Mengambil persyaratan dokumen berdasarkan id_modul
const getPersyaratanByModul = async (req, res) => {
    try {
        const { id_modul } = req.params;

        // Cek apakah modul ada
        const modul = await ModulLayanan.findByPk(id_modul);
        if (!modul) {
            return res.status(404).json({
                success: false,
                message: "Modul layanan tidak ditemukan",
            });
        }

        // Ambil semua persyaratan dokumen untuk modul ini
        const persyaratan = await PersyaratanDokumen.findAll({
            where: {
                id_modul: id_modul,
            },
            attributes: [
                "id_persyaratan",
                "nama_dokumen",
                "format_file",
                "wajib",
            ],
            order: [
                ["wajib", "DESC"], // Dokumen wajib di atas
                ["nama_dokumen", "ASC"],
            ],
        });

        res.status(200).json({
            success: true,
            data: {
                modul: {
                    id_modul: modul.id_modul,
                    nama_modul: modul.nama_modul,
                    deskripsi: modul.deskripsi,
                },
                persyaratan: persyaratan,
            },
        });
    } catch (error) {
        console.error("Error fetching persyaratan dokumen:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data persyaratan dokumen",
            error: error.message,
        });
    }
};

// POST - Create pengajuan baru
const createPengajuan = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {
            id_user,
            id_modul,
            nama_kabupaten,
            catatan_pemohon,
            dokumen_upload, // Array of {id_persyaratan, nama_file, path_file}
        } = req.body;

        console.log("📝 Creating pengajuan with data:", {
            id_user,
            id_modul,
            nama_kabupaten,
            dokumen_count: dokumen_upload?.length || 0,
        });

        // Validasi input
        if (!id_user || !id_modul) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "id_user dan id_modul harus diisi",
            });
        }

        // Cek modul ada
        const modul = await ModulLayanan.findByPk(id_modul);
        if (!modul) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Modul layanan tidak ditemukan",
            });
        }

        // Ambil semua persyaratan wajib
        const persyaratanWajib = await PersyaratanDokumen.findAll({
            where: {
                id_modul: id_modul,
                wajib: true,
            },
        });

        // Validasi: Semua dokumen wajib harus diupload
        if (dokumen_upload && dokumen_upload.length > 0) {
            const uploadedPersyaratanIds = dokumen_upload.map(
                (dok) => dok.id_persyaratan
            );

            const missingDokumen = persyaratanWajib.filter(
                (persyaratan) =>
                    !uploadedPersyaratanIds.includes(persyaratan.id_persyaratan)
            );

            if (missingDokumen.length > 0) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    message: "Semua dokumen wajib harus diupload",
                    missing_documents: missingDokumen.map((dok) => dok.nama_dokumen),
                });
            }
        } else if (persyaratanWajib.length > 0) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Tidak ada dokumen yang diupload. Harap upload dokumen wajib.",
            });
        }

        // Generate nomor registrasi
        const nomorRegistrasi = await generateNomorRegistrasi(id_modul);
        console.log("✅ Generated nomor registrasi:", nomorRegistrasi);

        // Buat pengajuan
        const pengajuan = await Pengajuan.create(
            {
                nomor_registrasi: nomorRegistrasi,
                id_user: id_user,
                id_modul: id_modul,
                tanggal_pengajuan: new Date(),
                status_pengajuan: "Diajukan",
                progress_persen: 0,
                catatan_pemohon: catatan_pemohon || null,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        console.log("✅ Pengajuan created with ID:", pengajuan.id_pengajuan);

        // Simpan dokumen
        const dokumenSaved = [];
        if (dokumen_upload && dokumen_upload.length > 0) {
            for (const dok of dokumen_upload) {
                const dokumenBaru = await Dokumen.create(
                    {
                        id_pengajuan: pengajuan.id_pengajuan,
                        id_persyaratan: dok.id_persyaratan,
                        nama_file: dok.nama_file,
                        path_file: dok.path_file,
                        jenis_dokumen: dok.jenis_dokumen || null,
                        status_verifikasi: "Menunggu Verifikasi",
                        created_at: new Date(),
                    },
                    { transaction: t }
                );
                dokumenSaved.push(dokumenBaru);
            }
            console.log(`✅ Saved ${dokumenSaved.length} dokumen`);
        }

        // Commit transaction
        await t.commit();

        // Ambil data lengkap
        const pengajuanLengkap = await Pengajuan.findByPk(
            pengajuan.id_pengajuan,
            {
                include: [
                    {
                        model: ModulLayanan,
                        as: "modul",
                        attributes: ["id_modul", "nama_modul", "deskripsi"],
                    },
                    {
                        model: Dokumen,
                        as: "dokumen",
                        include: [
                            {
                                model: PersyaratanDokumen,
                                as: "persyaratan",
                                attributes: ["nama_dokumen", "format_file"],
                            },
                        ],
                    },
                ],
            }
        );

        res.status(201).json({
            success: true,
            message: "Pengajuan berhasil dibuat",
            data: pengajuanLengkap,
        });
    } catch (error) {
        await t.rollback();
        console.error("❌ Error creating pengajuan:", error);
        res.status(500).json({
            success: false,
            message: "Gagal membuat pengajuan",
            error: error.message,
        });
    }
};

const getPengajuanByUser = async (req, res) => {
    try {
        const { id_user } = req.params;

        const pengajuan = await Pengajuan.findAll({
            where: { id_user: id_user },
            include: [
                {
                    model: ModulLayanan,
                    as: "modul",
                    attributes: ["nama_modul"]
                }
            ],
            order: [["created_at", "DESC"]]
        });

        // Transformasi data agar sesuai kebutuhan FE
        const dataFormatted = pengajuan.map((item, index) => ({
            no: index + 1, // Nomor urut 1, 2, 3...
            id_pengajuan: item.id_pengajuan,
            id_modul: item.id_modul, // Untuk filter
            nomor_registrasi: item.nomor_registrasi,
            nama_layanan: item.modul ? item.modul.nama_modul : "Tidak diketahui",
            tanggal: item.tanggal_pengajuan,
            // Logika status: Jika "Diajukan" di DB, tampilkan "Menunggu Verifikasi"
            status: item.status_pengajuan === "Diajukan" ? "Menunggu Verifikasi" : item.status_pengajuan,
            progress: item.progress_persen
        }));

        res.status(200).json({
            success: true,
            data: dataFormatted
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Gagal mengambil riwayat pengajuan",
            error: error.message
        });
    }
};
module.exports = {
    getAllModulLayanan,
    getPersyaratanByModul,
    createPengajuan,
    getPengajuanByUser
};
