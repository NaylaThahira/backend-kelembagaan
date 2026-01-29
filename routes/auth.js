const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/login', authController.login);

router.get('/verify', authenticate, authController.verifyToken);

router.post('/logout', authenticate, authController.logout);

module.exports = router;
