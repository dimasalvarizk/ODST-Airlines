const { getPool } = require('../config/db');

/**
 * Record an action to the audit logs
 * @param {Object} req Express request object (optional, for IP and user resolution)
 * @param {Object} params Audit log details
 * @param {string} params.action Description of action e.g. 'COUNTDOWN_UPDATED', 'INQUIRY_STATUS_CHANGED'
 * @param {string} params.module Module name: 'auth' | 'countdown' | 'contact' | 'contact_info' | 'system'
 * @param {string|number} [params.record_id] ID of affected record
 * @param {Object} [params.details] JSON object with changes or details
 * @param {Object} [params.user] Override user if req.user is not available
 */
const logAudit = async (req, { action, module, record_id = null, details = null, user = null }) => {
  try {
    const pool = getPool();
    const currentUser = user || req?.user || null;
    const adminId = currentUser ? currentUser.id : null;
    const adminEmail = currentUser ? currentUser.email : (req?.body?.email || 'anonymous');

    let clientIp = '127.0.0.1';
    if (req) {
      clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1';
    }

    const detailsJson = details ? JSON.stringify(details) : null;

    await pool.query(
      `INSERT INTO audit_logs (admin_id, admin_email, action, module, record_id, details, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [adminId, adminEmail, action, module, record_id ? String(record_id) : null, detailsJson, clientIp]
    );
  } catch (err) {
    console.error('[AuditService Error] Failed to write audit log:', err.message);
  }
};

module.exports = {
  logAudit,
};
