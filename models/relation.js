const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// ===========================
// DEFINE MODELS
// ===========================

// 1. ModulLayanan Model
const ModulLayanan = sequelize.define(
  "ModulLayanan",
  {
    id_modul: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_modul: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "modul_layanan",
    timestamps: false,
  }
);

// 2. PersyaratanDokumen Model
const PersyaratanDokumen = sequelize.define(
  "PersyaratanDokumen",
  {
    id_persyaratan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_modul: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_dokumen: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    format_file: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    wajib: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "persyaratan_dokumen",
    timestamps: false,
  }
);

// 3. Pengajuan Model
const Pengajuan = sequelize.define(
  "Pengajuan",
  {
    id_pengajuan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomor_registrasi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_modul: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tanggal_pengajuan: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status_pengajuan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    progress_persen: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    catatan_pemohon: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tahapan_proses: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Tahapan proses pengajuan'
    },
    file_surat_rekomendasi: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Path file surat rekomendasi dari admin (output final)'
    },
    tanggal_selesai: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Tanggal admin menyelesaikan pengajuan'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "pengajuan",
    timestamps: false,
  }
);

// 4. Dokumen Model
const Dokumen = sequelize.define(
  "Dokumen",
  {
    id_dokumen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pengajuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_persyaratan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_file: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    path_file: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    jenis_dokumen: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status_verifikasi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "dokumen",
    timestamps: false,
  }
);

// 5. CatatanRevisi Model
const CatatanRevisi = sequelize.define(
  "CatatanRevisi",
  {
    id_catatan_revisi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pengajuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    catatan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "catatan_revisi",
    timestamps: false,
  }
);


const User = require("./User");
User.hasMany(Pengajuan, {
  foreignKey: "id_user",
  as: "pengajuan",
});
Pengajuan.belongsTo(User, {
  foreignKey: "id_user",
  as: "user",
});

// ModulLayanan -> Pengajuan (One to Many)
ModulLayanan.hasMany(Pengajuan, {
  foreignKey: "id_modul",
  as: "pengajuan",
});
Pengajuan.belongsTo(ModulLayanan, {
  foreignKey: "id_modul",
  as: "modul",
});

// ModulLayanan -> PersyaratanDokumen (One to Many)
ModulLayanan.hasMany(PersyaratanDokumen, {
  foreignKey: "id_modul",
  as: "persyaratan",
});
PersyaratanDokumen.belongsTo(ModulLayanan, {
  foreignKey: "id_modul",
  as: "modul",
});

// Pengajuan -> Dokumen (One to Many)
Pengajuan.hasMany(Dokumen, {
  foreignKey: "id_pengajuan",
  as: "dokumen",
});
Dokumen.belongsTo(Pengajuan, {
  foreignKey: "id_pengajuan",
  as: "pengajuan",
});

// PersyaratanDokumen -> Dokumen (One to Many)
PersyaratanDokumen.hasMany(Dokumen, {
  foreignKey: "id_persyaratan",
  as: "dokumen",
});
Dokumen.belongsTo(PersyaratanDokumen, {
  foreignKey: "id_persyaratan",
  as: "persyaratan",
});

Pengajuan.hasMany(CatatanRevisi, {
  foreignKey: "id_pengajuan",
  as: "revisi_list", 
});
CatatanRevisi.belongsTo(Pengajuan, {
  foreignKey: "id_pengajuan",
  as: "pengajuan",
});

// ===========================
// EXPORT MODELS
// ===========================
module.exports = {
  User,
  ModulLayanan,
  PersyaratanDokumen,
  Pengajuan,
  Dokumen,
  CatatanRevisi,
};
