'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'foto_profile', {
            type: Sequelize.STRING(255),
            allowNull: true,
            after: 'no_hp',
            comment: 'Nama file foto profile'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'foto_profile');
    }
};
