const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Route đăng ký
router.post('/register', authController.register);

// Route đăng nhập
router.post('/login', authController.login);

// Route lấy thông tin profile (yêu cầu xác thực)
router.get('/profile', auth, authController.getProfile);

module.exports = router;
