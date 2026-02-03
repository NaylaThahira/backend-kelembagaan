-- Migration untuk table notifikasi
-- Jalankan dengan: mysql -u root -p nama_database < migrations/create_notifikasi_table.sql

CREATE TABLE IF NOT EXISTS `notifikasi` (
  `id_notifikasi` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL COMMENT 'User yang menerima notifikasi',
  `id_pengajuan` INT NULL COMMENT 'ID pengajuan terkait (jika ada)',
  `judul` VARCHAR(255) NOT NULL COMMENT 'Judul notifikasi',
  `pesan` TEXT NOT NULL COMMENT 'Isi pesan notifikasi',
  `tipe` ENUM('pengajuan_baru', 'perubahan_status', 'info') NOT NULL COMMENT 'Tipe notifikasi',
  `is_read` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Status sudah dibaca atau belum',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_notifikasi`),
  INDEX `idx_user` (`id_user`),
  INDEX `idx_pengajuan` (`id_pengajuan`),
  INDEX `idx_is_read` (`is_read`),
  CONSTRAINT `fk_notifikasi_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_notifikasi_pengajuan`
    FOREIGN KEY (`id_pengajuan`)
    REFERENCES `pengajuan` (`id_pengajuan`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Table untuk menyimpan notifikasi user';
