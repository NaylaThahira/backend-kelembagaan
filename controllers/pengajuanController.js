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
                status_pengajuan: "Menunggu Verifikasi",  // Status awal: langsung ke verifikasi
                progress_persen: 0,
                catatan_pemohon: catatan_pemohon || null,
                tahapan_proses: null,
                catatan_revisi: null,
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
            progress: item.progress_persen,
            tahapan_proses: item.tahapan_proses,
            catatan_revisi: item.catatan_revisi
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

// GET - Semua pengajuan untuk admin
const getAllPengajuan = async (req, res) => {
    try {
        const User = require("../models/User");

        const pengajuan = await Pengajuan.findAll({
            include: [
                {
                    model: ModulLayanan,
                    as: "modul",
                    attributes: ["nama_modul"]
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["kabupaten_kota"]
                }
            ],
            order: [["created_at", "DESC"]]
        });

        // Helper function untuk convert Windows path ke URL path
        const convertToUrlPath = (filePath) => {
            if (!filePath) return null;
            // Jika sudah ada prefix /, return as is
            if (filePath.startsWith('/')) return filePath;
            // Convert backslash ke forward slash dan tambah prefix /
            return '/' + filePath.replace(/\\/g, '/');
        };

        // Transformasi data untuk frontend
        const dataFormatted = pengajuan.map((item, index) => ({
            no: index + 1,
            id_pengajuan: item.id_pengajuan,
            nomor_registrasi: item.nomor_registrasi,
            pemohon: item.user ? item.user.kabupaten_kota : "Tidak diketahui",
            nama_layanan: item.modul ? item.modul.nama_modul : "Tidak diketahui",
            tanggal: item.tanggal_pengajuan,
            status: item.status_pengajuan,
            progress: item.progress_persen,
            tahapan_proses: item.tahapan_proses,
            catatan_revisi: item.catatan_revisi,
            catatan_pemohon: item.catatan_pemohon,
            file_surat_rekomendasi: convertToUrlPath(item.file_surat_rekomendasi),  // Convert path!
            tanggal_selesai: item.tanggal_selesai
        }));

        res.status(200).json({
            success: true,
            data: dataFormatted
        });
    } catch (error) {
        console.error("Error fetching all pengajuan:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data pengajuan",
            error: error.message
        });
    }
};

// GET - Pengajuan berdasarkan status untuk admin
const getPengajuanByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const User = require("../models/User");

        const pengajuan = await Pengajuan.findAll({
            where: { status_pengajuan: status },
            include: [
                {
                    model: ModulLayanan,
                    as: "modul",
                    attributes: ["nama_modul"]
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["kabupaten_kota"]
                }
            ],
            order: [["created_at", "DESC"]]
        });

        // Helper function untuk convert Windows path ke URL path
        const convertToUrlPath = (filePath) => {
            if (!filePath) return null;
            // Jika sudah ada prefix /, return as is
            if (filePath.startsWith('/')) return filePath;
            // Convert backslash ke forward slash dan tambah prefix /
            return '/' + filePath.replace(/\\/g, '/');
        };

        const dataFormatted = pengajuan.map((item, index) => ({
            no: index + 1,
            id_pengajuan: item.id_pengajuan,
            nomor_registrasi: item.nomor_registrasi,
            pemohon: item.user ? item.user.kabupaten_kota : "Tidak diketahui",
            nama_layanan: item.modul ? item.modul.nama_modul : "Tidak diketahui",
            tanggal: item.tanggal_pengajuan,
            status: item.status_pengajuan,
            progress: item.progress_persen,
            tahapan_proses: item.tahapan_proses,
            catatan_revisi: item.catatan_revisi,
            catatan_pemohon: item.catatan_pemohon,
            file_surat_rekomendasi: convertToUrlPath(item.file_surat_rekomendasi),  // Convert path!
            tanggal_selesai: item.tanggal_selesai
        }));

        res.status(200).json({
            success: true,
            data: dataFormatted
        });
    } catch (error) {
        console.error("Error fetching pengajuan by status:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data pengajuan",
            error: error.message
        });
    }
};

// PUT - Update status pengajuan (untuk admin)
const updatePengajuanStatus = async (req, res) => {
    try {
        const { id_pengajuan } = req.params;
        const {
            status_pengajuan,
            tahapan_proses,
            catatan_revisi,
            progress_persen,
            created_by  // Username admin
        } = req.body;

        const { Pengajuan, CatatanRevisi } = require("../models/relation");
        const pengajuan = await Pengajuan.findByPk(id_pengajuan);

        if (!pengajuan) {
            return res.status(404).json({
                success: false,
                message: "Pengajuan tidak ditemukan"
            });
        }

        // Update status pengajuan
        await pengajuan.update({
            status_pengajuan: status_pengajuan || pengajuan.status_pengajuan,
            tahapan_proses: tahapan_proses !== undefined ? tahapan_proses : pengajuan.tahapan_proses,
            progress_persen: progress_persen !== undefined ? progress_persen : pengajuan.progress_persen,
            updated_at: new Date()
        });

        // Jika ada catatan revisi, simpan ke tabel catatan_revisi
        if (catatan_revisi && status_pengajuan === 'Perlu Perbaikan') {
            await CatatanRevisi.create({
                id_pengajuan: id_pengajuan,
                catatan: catatan_revisi,
                created_by: created_by || 'admin',
                created_at: new Date()
            });
        }

        res.status(200).json({
            success: true,
            message: "Status pengajuan berhasil diupdate",
            data: pengajuan
        });
    } catch (error) {
        console.error("Error updating pengajuan:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengupdate status pengajuan",
            error: error.message
        });
    }
};

// GET - Dokumen by pengajuan ID
const getDokumenByPengajuan = async (req, res) => {
    try {
        const { id_pengajuan } = req.params;
        const { Dokumen, PersyaratanDokumen } = require("../models/relation");

        const dokumen = await Dokumen.findAll({
            where: { id_pengajuan: id_pengajuan },
            include: [
                {
                    model: PersyaratanDokumen,
                    as: "persyaratan",
                    attributes: ["nama_dokumen", "format_file"]
                }
            ],
            order: [["created_at", "ASC"]]
        });

        res.status(200).json({
            success: true,
            data: dokumen
        });
    } catch (error) {
        console.error("Error fetching dokumen:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data dokumen",
            error: error.message
        });
    }
};

// GET - Catatan Revisi by pengajuan ID
const getCatatanRevisi = async (req, res) => {
    try {
        const { id_pengajuan } = req.params;
        const { CatatanRevisi } = require("../models/relation");

        const catatanList = await CatatanRevisi.findAll({
            where: { id_pengajuan: id_pengajuan },
            order: [["created_at", "DESC"]]  // Terbaru di atas
        });

        res.status(200).json({
            success: true,
            data: catatanList
        });
    } catch (error) {
        console.error("Error fetching catatan revisi:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil catatan revisi",
            error: error.message
        });
    }
};

// POST - Selesaikan pengajuan dengan upload surat rekomendasi
const selesaikanPengajuan = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File surat rekomendasi wajib diupload"
            });
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "File harus berformat PDF atau Word (.doc, .docx)"
            });
        }

        // Find pengajuan
        const pengajuan = await Pengajuan.findByPk(id);
        if (!pengajuan) {
            return res.status(404).json({
                success: false,
                message: "Pengajuan tidak ditemukan"
            });
        }

        // Validate status
        if (pengajuan.status_pengajuan !== 'Dalam Proses') {
            return res.status(400).json({
                success: false,
                message: "Hanya pengajuan dengan status 'Dalam Proses' yang bisa diselesaikan"
            });
        }

        // Update pengajuan
        // Convert Windows backslash to forward slash dan tambah prefix /
        const filePath = '/' + file.path.replace(/\\/g, '/');

        await pengajuan.update({
            status_pengajuan: 'Selesai',
            file_surat_rekomendasi: filePath,
            tanggal_selesai: new Date(),
            progress_persen: 100,
            tahapan_proses: null,  // Clear tahapan karena sudah selesai
            updated_at: new Date()
        });

        res.status(200).json({
            success: true,
            message: "Pengajuan berhasil diselesaikan",
            data: {
                id_pengajuan: pengajuan.id_pengajuan,
                status_pengajuan: 'Selesai',
                file_surat_rekomendasi: pengajuan.file_surat_rekomendasi,
                tanggal_selesai: pengajuan.tanggal_selesai
            }
        });
    } catch (error) {
        console.error("Error selesaikan pengajuan:", error);
        res.status(500).json({
            success: false,
            message: "Gagal menyelesaikan pengajuan",
            error: error.message
        });
    }
};

module.exports = {
    getAllModulLayanan,
    getPersyaratanByModul,
    createPengajuan,
    getPengajuanByUser,
    getAllPengajuan,
    getPengajuanByStatus,
    updatePengajuanStatus,
    getDokumenByPengajuan,
    getCatatanRevisi,
    selesaikanPengajuan
};
