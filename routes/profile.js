const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate } = require('../middleware/auth');
const uploadProfile = require('../config/uploadProfile');

// Update profile (authenticated users) - with optional profile photo
router.put('/', authenticate, uploadProfile.single('foto_profile'), profileController.updateProfile);

// Update password (authenticated users)
router.put('/password', authenticate, profileController.updatePassword);

module.exports = router;
