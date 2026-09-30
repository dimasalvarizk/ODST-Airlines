const { getPool } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/response');
const { logAudit } = require('../services/auditService');

/**
 * Public Contact Form Submission
 * POST /api/contact
 */
const submitPublicInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Nama, Email, dan Pesan wajib diisi.',
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Format alamat email tidak valid.',
      });
    }

    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1';

    const pool = getPool();
    const [result] = await pool.query(
      `INSERT INTO contact_inquiries (name, email, phone, subject, message, status, ip_address)
       VALUES (?, ?, ?, ?, ?, 'new', ?)`,
      [name.trim(), email.trim().toLowerCase(), phone?.trim() || null, subject?.trim() || null, message.trim(), clientIp]
    );

    return successResponse(res, {
      statusCode: 201,
      message: 'Pesan Anda berhasil terkirim. Tim ODST Airlines akan segera menghubungi Anda.',
      data: {
        inquiryId: result.insertId,
      },
    });
  } catch (err) {
    console.error('[ContactController.submitPublicInquiry]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Get Public Contact Information
 * GET /api/contact-info
 */
const getPublicContactInfo = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM contact_info ORDER BY id ASC LIMIT 1');

    if (rows.length === 0) {
      return successResponse(res, {
        data: {
          company_name: 'ODST Airlines',
          division: 'Aviation & Charter',
          phone: '+62 81111 202220',
          phone_tel: '+6281111202220',
          email: 'info@odst.id',
          address: 'Graha Al Badgel Jl. Hajjah Tutty Alawiyah No.7, Jakarta',
        },
      });
    }

    return successResponse(res, {
      data: rows[0],
    });
  } catch (err) {
    console.error('[ContactController.getPublicContactInfo]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Get Inquiries for Admin with Pagination, Filtering & Search
 * GET /api/admin/contacts
 */
const getAdminInquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const status = req.query.status || 'all';
    const search = req.query.search?.trim() || '';
    const offset = (page - 1) * limit;

    const pool = getPool();
    let whereConditions = [];
    let queryParams = [];

    if (status && status !== 'all') {
      whereConditions.push('status = ?');
      queryParams.push(status);
    }

    if (search) {
      whereConditions.push('(name LIKE ? OR email LIKE ? OR subject LIKE ? OR phone LIKE ? OR message LIKE ?)');
      const searchWildcard = `%${search}%`;
      queryParams.push(searchWildcard, searchWildcard, searchWildcard, searchWildcard, searchWildcard);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Count total matching records
    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM contact_inquiries ${whereClause}`,
      queryParams
    );
    const totalRecords = countRows[0].total;
    const totalPages = Math.ceil(totalRecords / limit) || 1;

    // Fetch paginated records
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, subject, message, status, admin_notes, ip_address, created_at, updated_at
       FROM contact_inquiries
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    // Get count breakdown by status for fast dashboard tabs
    const [statusCounts] = await pool.query(`
      SELECT 
        COUNT(*) as totalAll,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as totalNew,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as totalInProgress,
        SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as totalReplied,
        SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as totalResolved,
        SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as totalArchived
      FROM contact_inquiries
    `);

    return successResponse(res, {
      message: 'Daftar pesan masuk berhasil diambil.',
      data: rows,
      meta: {
        page,
        limit,
        totalRecords,
        totalPages,
        statusCounts: statusCounts[0] || {},
      },
    });
  } catch (err) {
    console.error('[ContactController.getAdminInquiries]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Get Single Inquiry Detail
 * GET /api/admin/contacts/:id
 */
const getAdminInquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [rows] = await pool.query('SELECT * FROM contact_inquiries WHERE id = ?', [id]);
    if (rows.length === 0) {
      return errorResponse(res, { statusCode: 404, message: 'Pesan tidak ditemukan.' });
    }

    const inquiry = rows[0];

    // Fetch related audit logs
    const [auditRows] = await pool.query(
      `SELECT id, admin_email, action, details, ip_address, created_at 
       FROM audit_logs 
       WHERE module = 'contact' AND record_id = ? 
       ORDER BY created_at DESC`,
      [String(id)]
    );

    return successResponse(res, {
      data: {
        inquiry,
        auditHistory: auditRows,
      },
    });
  } catch (err) {
    console.error('[ContactController.getAdminInquiryById]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Update Inquiry Status & Notes (Audit Tracked)
 * PATCH /api/admin/contacts/:id
 */
const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    const validStatuses = ['new', 'in_progress', 'replied', 'resolved', 'archived'];
    if (status && !validStatuses.includes(status)) {
      return errorResponse(res, {
        statusCode: 400,
        message: `Status tidak valid. Pilihan: ${validStatuses.join(', ')}`,
      });
    }

    const pool = getPool();
    const [existing] = await pool.query('SELECT * FROM contact_inquiries WHERE id = ?', [id]);

    if (existing.length === 0) {
      return errorResponse(res, { statusCode: 404, message: 'Pesan tidak ditemukan.' });
    }

    const currentData = existing[0];
    const newStatus = status || currentData.status;
    const newNotes = admin_notes !== undefined ? admin_notes : currentData.admin_notes;

    await pool.query(
      'UPDATE contact_inquiries SET status = ?, admin_notes = ? WHERE id = ?',
      [newStatus, newNotes, id]
    );

    // Audit log
    await logAudit(req, {
      action: 'INQUIRY_UPDATED',
      module: 'contact',
      record_id: id,
      details: {
        sender: currentData.name,
        email: currentData.email,
        previous_status: currentData.status,
        new_status: newStatus,
        notes_updated: admin_notes !== undefined,
      },
    });

    const [updatedRows] = await pool.query('SELECT * FROM contact_inquiries WHERE id = ?', [id]);

    return successResponse(res, {
      message: 'Status dan catatan pesan berhasil diperbarui.',
      data: updatedRows[0],
    });
  } catch (err) {
    console.error('[ContactController.updateInquiryStatus]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Delete Inquiry (Admin only)
 * DELETE /api/admin/contacts/:id
 */
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [existing] = await pool.query('SELECT * FROM contact_inquiries WHERE id = ?', [id]);
    if (existing.length === 0) {
      return errorResponse(res, { statusCode: 404, message: 'Pesan tidak ditemukan.' });
    }

    const inquiry = existing[0];

    await pool.query('DELETE FROM contact_inquiries WHERE id = ?', [id]);

    await logAudit(req, {
      action: 'INQUIRY_DELETED',
      module: 'contact',
      record_id: id,
      details: {
        sender: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject,
      },
    });

    return successResponse(res, {
      message: 'Pesan berhasil dihapus dari sistem.',
    });
  } catch (err) {
    console.error('[ContactController.deleteInquiry]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Get Official Contact Information (Admin)
 * GET /api/admin/contact-info
 */
const getAdminContactInfo = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM contact_info ORDER BY id ASC LIMIT 1');
    return successResponse(res, {
      data: rows[0] || null,
    });
  } catch (err) {
    console.error('[ContactController.getAdminContactInfo]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Update Official Contact Information (Admin with Audit)
 * PUT /api/admin/contact-info
 */
const updateContactInfo = async (req, res) => {
  try {
    const {
      company_name,
      division,
      phone,
      phone_tel,
      email,
      address,
      map_embed_url,
      map_direct_url,
    } = req.body;

    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM contact_info ORDER BY id ASC LIMIT 1');

    if (rows.length === 0) {
      await pool.query(`
        INSERT INTO contact_info (company_name, division, phone, phone_tel, email, address, map_embed_url, map_direct_url, updated_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [company_name, division, phone, phone_tel, email, address, map_embed_url, map_direct_url, req.user.email]);
    } else {
      const old = rows[0];
      await pool.query(`
        UPDATE contact_info SET
          company_name = ?,
          division = ?,
          phone = ?,
          phone_tel = ?,
          email = ?,
          address = ?,
          map_embed_url = ?,
          map_direct_url = ?,
          updated_by = ?
        WHERE id = ?
      `, [
        company_name || old.company_name,
        division || old.division,
        phone || old.phone,
        phone_tel || old.phone_tel,
        email || old.email,
        address || old.address,
        map_embed_url || old.map_embed_url,
        map_direct_url || old.map_direct_url,
        req.user.email,
        old.id,
      ]);
    }

    await logAudit(req, {
      action: 'CONTACT_INFO_UPDATED',
      module: 'contact_info',
      details: {
        phone,
        email,
        company_name,
      },
    });

    const [updated] = await pool.query('SELECT * FROM contact_info ORDER BY id ASC LIMIT 1');
    return successResponse(res, {
      message: 'Informasi kontak resmi berhasil diperbarui.',
      data: updated[0],
    });
  } catch (err) {
    console.error('[ContactController.updateContactInfo]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

module.exports = {
  submitPublicInquiry,
  getPublicContactInfo,
  getAdminInquiries,
  getAdminInquiryById,
  updateInquiryStatus,
  deleteInquiry,
  getAdminContactInfo,
  updateContactInfo,
};
