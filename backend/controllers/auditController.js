const { getPool } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Get Paginated Audit Logs with Filtering & Search
 * GET /api/admin/audit-logs
 */
const getAuditLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '15', 10);
    const module = req.query.module || 'all';
    const action = req.query.action || '';
    const search = req.query.search?.trim() || '';
    const offset = (page - 1) * limit;

    const pool = getPool();
    let whereConditions = [];
    let queryParams = [];

    if (module && module !== 'all') {
      whereConditions.push('module = ?');
      queryParams.push(module);
    }

    if (action) {
      whereConditions.push('action = ?');
      queryParams.push(action);
    }

    if (search) {
      whereConditions.push('(admin_email LIKE ? OR action LIKE ? OR ip_address LIKE ?)');
      const searchWildcard = `%${search}%`;
      queryParams.push(searchWildcard, searchWildcard, searchWildcard);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Total Count
    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM audit_logs ${whereClause}`,
      queryParams
    );
    const totalRecords = countRows[0].total;
    const totalPages = Math.ceil(totalRecords / limit) || 1;

    // Fetch records
    const [rows] = await pool.query(
      `SELECT id, admin_id, admin_email, action, module, record_id, details, ip_address, created_at
       FROM audit_logs
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return successResponse(res, {
      message: 'Log audit berhasil diambil.',
      data: rows,
      meta: {
        page,
        limit,
        totalRecords,
        totalPages,
      },
    });
  } catch (err) {
    console.error('[AuditController.getAuditLogs]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

module.exports = {
  getAuditLogs,
};
