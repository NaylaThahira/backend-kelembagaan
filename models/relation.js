const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Pengajuan = require("./Pengajuan");
const ModulLayanan = require("./modulLayanan");
const PersyaratanDokumen = require("./PersyaratanDokumen");
const Dokumen = require("./dokumen");
const CatatanRevisi = require("./CatatanRevisi");


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


module.exports = {
  User,
  ModulLayanan,
  PersyaratanDokumen,
  Pengajuan,
  Dokumen,
  CatatanRevisi,
};
