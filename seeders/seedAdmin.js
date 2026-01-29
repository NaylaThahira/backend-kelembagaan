const { User } = require("../models/relation");

const adminData = {
    kabupaten_kota: 'Admin Biro Organisasi',
    username: 'admin',
    password: 'admin123',  
    role: 'admin'
};

async function seedAdmin() {
    try {
        await User.destroy({ where: { username: 'admin' } });
        await User.create(adminData);

        console.log("Berhasil seed admin user");
    } catch (error) {
        console.error("Error seeding admin:", error);
        throw error;
    }
}

module.exports = seedAdmin;
