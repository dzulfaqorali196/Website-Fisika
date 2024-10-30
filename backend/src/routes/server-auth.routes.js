const express = require('express');
const router = express.Router();
const authController = require('../controllers/server-auth.controller');
const { verifySessionCookie } = require('../middleware/server-auth.middleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protected routes (memerlukan autentikasi)
router.get('/profile', verifySessionCookie, authController.getProfile);
router.put('/profile', verifySessionCookie, authController.updateProfile);

module.exports = router;
