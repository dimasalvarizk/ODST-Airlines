const express = require('express');
const router = express.Router();
const {
  submitPublicInquiry,
  getPublicContactInfo,
  getAdminInquiries,
  getAdminInquiryById,
  updateInquiryStatus,
  deleteInquiry,
  getAdminContactInfo,
  updateContactInfo,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public contact routes
router.post('/', submitPublicInquiry);
router.get('/info', getPublicContactInfo);

// Admin contact inquiries routes
router.get('/admin', protect, getAdminInquiries);
router.get('/admin/info', protect, getAdminContactInfo);
router.put('/admin/info', protect, updateContactInfo);
router.get('/admin/:id', protect, getAdminInquiryById);
router.patch('/admin/:id', protect, updateInquiryStatus);
router.delete('/admin/:id', protect, deleteInquiry);

module.exports = router;
