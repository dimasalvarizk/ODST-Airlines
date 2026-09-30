const express = require('express');
const router = express.Router();
const {
  getPublicCountdown,
  getAdminCountdown,
  updateCountdown,
} = require('../controllers/countdownController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.get('/', getPublicCountdown);

// Admin protected routes
router.get('/admin', protect, getAdminCountdown);
router.put('/admin', protect, updateCountdown);

module.exports = router;
