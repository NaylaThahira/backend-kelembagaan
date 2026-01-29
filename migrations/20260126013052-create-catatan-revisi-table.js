'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('catatan_revisi', {
      id_catatan_revisi: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_pengajuan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pengajuan',
          key: 'id_pengajuan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      catatan: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_by: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Username admin yang membuat catatan'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('catatan_revisi', ['id_pengajuan']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('catatan_revisi');
  }
};
