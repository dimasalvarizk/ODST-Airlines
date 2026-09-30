const { getPool } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Get Admin Dashboard Overview Statistics
 * GET /api/admin/dashboard/stats
 */
const getDashboardStats = async (req, res) => {
  try {
    const pool = getPool();

    // 1. Inquiry Counts
    const [inquiryStats] = await pool.query(`
      SELECT 
        COUNT(*) as totalInquiries,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as newInquiries,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as inProgressInquiries,
        SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as repliedInquiries,
        SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolvedInquiries,
        SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archivedInquiries,
        SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) as todayInquiries
      FROM contact_inquiries
    `);

    // 2. Countdown Configuration Status
    const [countdownRows] = await pool.query('SELECT * FROM countdown_settings ORDER BY id ASC LIMIT 1');
    const countdown = countdownRows[0] || null;

    // Calculate time left if target date is set
    let countdownMeta = {
      isActive: false,
      targetDate: null,
      daysLeft: 0,
      hoursLeft: 0,
      isExpired: true,
    };

    if (countdown) {
      const now = new Date();
      const target = new Date(countdown.target_date);
      const diffMs = target - now;
      const isExpired = diffMs <= 0;

      const daysLeft = isExpired ? 0 : Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hoursLeft = isExpired ? 0 : Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      countdownMeta = {
        isActive: Boolean(countdown.is_active),
        targetDate: countdown.target_date,
        isExpired,
        daysLeft,
        hoursLeft,
        title_id: countdown.title_id,
        updated_at: countdown.updated_at,
        updated_by: countdown.updated_by,
      };
    }

    // 3. Recent 5 Inquiries
    const [recentInquiries] = await pool.query(`
      SELECT id, name, email, phone, subject, status, created_at 
      FROM contact_inquiries 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    // 4. Recent 5 Audit Logs
    const [recentAudits] = await pool.query(`
      SELECT id, admin_email, action, module, record_id, details, ip_address, created_at 
      FROM audit_logs 
      ORDER BY created_at DESC 
      LIMIT 6
    `);

    // 5. Total Audit Actions
    const [auditCount] = await pool.query('SELECT COUNT(*) as totalAudits FROM audit_logs');

    return successResponse(res, {
      message: 'Statistik dashboard berhasil diambil.',
      data: {
        inquiries: {
          total: inquiryStats[0].totalInquiries || 0,
          new: inquiryStats[0].newInquiries || 0,
          inProgress: inquiryStats[0].inProgressInquiries || 0,
          replied: inquiryStats[0].repliedInquiries || 0,
          resolved: inquiryStats[0].resolvedInquiries || 0,
          archived: inquiryStats[0].archivedInquiries || 0,
          today: inquiryStats[0].todayInquiries || 0,
        },
        countdown: countdownMeta,
        audits: {
          total: auditCount[0].totalAudits || 0,
        },
        recentInquiries,
        recentAudits,
      },
    });
  } catch (err) {
    console.error('[DashboardController.getDashboardStats]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

module.exports = {
  getDashboardStats,
};
