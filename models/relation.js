const sequelize = require("../config/database");
const User = require("./User");
const Pengajuan = require("./Pengajuan");
const ModulLayanan = require("./ModulLayanan");
const PersyaratanDokumen = require("./PersyaratanDokumen");
const Dokumen = require("./dokumen");
const CatatanRevisi = require("./CatatanRevisi");
const Notifikasi = require("./Notifikasi");
const Proses = require("./Proses");
const LogProses = require("./LogProses");
const BuktiDukungProses = require("./BuktiDukungProses");

User.hasMany(Pengajuan, { foreignKey: "id_user", as: "pengajuan" });
Pengajuan.belongsTo(User, { foreignKey: "id_user", as: "user" });

User.hasMany(Notifikasi, { foreignKey: "id_user", as: "notifikasi" });
Notifikasi.belongsTo(User, { foreignKey: "id_user", as: "user" });

ModulLayanan.hasMany(Pengajuan, { foreignKey: "id_modul", as: "pengajuan" });
Pengajuan.belongsTo(ModulLayanan, { foreignKey: "id_modul", as: "modul" });

ModulLayanan.hasMany(PersyaratanDokumen, { foreignKey: "id_modul", as: "persyaratan" });
PersyaratanDokumen.belongsTo(ModulLayanan, { foreignKey: "id_modul", as: "modul" });

Pengajuan.hasMany(Dokumen, { foreignKey: "id_pengajuan", as: "dokumen" });
Dokumen.belongsTo(Pengajuan, { foreignKey: "id_pengajuan", as: "pengajuan" });

PersyaratanDokumen.hasMany(Dokumen, { foreignKey: "id_persyaratan", as: "dokumen" });
Dokumen.belongsTo(PersyaratanDokumen, { foreignKey: "id_persyaratan", as: "persyaratan" });

Pengajuan.hasMany(CatatanRevisi, { foreignKey: "id_pengajuan", as: "revisi_list" });
CatatanRevisi.belongsTo(Pengajuan, { foreignKey: "id_pengajuan", as: "pengajuan" });

Pengajuan.hasMany(LogProses, { foreignKey: "id_pengajuan", as: "log_proses" });
LogProses.belongsTo(Pengajuan, { foreignKey: "id_pengajuan", as: "pengajuan" });

Proses.hasMany(LogProses, { foreignKey: "id_proses", as: "log_proses" });
LogProses.belongsTo(Proses, { foreignKey: "id_proses", as: "proses" });

LogProses.hasMany(BuktiDukungProses, { foreignKey: "id_log", as: "bukti_dukung" });
BuktiDukungProses.belongsTo(LogProses, { foreignKey: "id_log", as: "log" });

module.exports = {
  User,
  ModulLayanan,
  PersyaratanDokumen,
  Pengajuan,
  Dokumen,
  CatatanRevisi,
  Notifikasi,
  Proses,
  LogProses,
  BuktiDukungProses,
};
