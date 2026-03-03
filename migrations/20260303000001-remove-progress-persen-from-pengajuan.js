'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const desc = await queryInterface.describeTable('pengajuan');
        if (desc.progress_persen) {
            await queryInterface.removeColumn('pengajuan', 'progress_persen');
        }
    },

    async down(queryInterface, Sequelize) {
        const desc = await queryInterface.describeTable('pengajuan');
        if (!desc.progress_persen) {
            await queryInterface.addColumn('pengajuan', 'progress_persen', {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
            });
        }
    },
};
