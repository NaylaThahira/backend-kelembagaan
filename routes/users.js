const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Semua route user hanya bisa diakses oleh admin yang sudah login
// GET all users
router.get('/', authenticate, isAdmin, userController.getAllUsers);

// POST create new user
router.post('/', authenticate, isAdmin, userController.createUser);

// PUT update user
router.put('/:id', authenticate, isAdmin, userController.updateUser);

// DELETE user
router.delete('/:id', authenticate, isAdmin, userController.deleteUser);

module.exports = router;
