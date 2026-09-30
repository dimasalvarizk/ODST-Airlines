const { getPool } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/response');
const { logAudit } = require('../services/auditService');

/**
 * Get Public Countdown configuration (for Landing page)
 * GET /api/countdown
 */
const getPublicCountdown = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, target_date, is_active, label_id, label_en, label_ar, title_id, title_en, title_ar, description_id, description_en, description_ar, updated_at FROM countdown_settings ORDER BY id ASC LIMIT 1'
    );

    if (rows.length === 0) {
      return successResponse(res, {
        message: 'Countdown data not found, default returned',
        data: {
          isActive: false,
          targetDate: null,
          serverTime: new Date().toISOString(),
        },
      });
    }

    const row = rows[0];
    return successResponse(res, {
      message: 'Countdown data fetched successfully',
      data: {
        id: row.id,
        targetDate: row.target_date,
        isActive: Boolean(row.is_active),
        label: {
          id: row.label_id,
          en: row.label_en,
          ar: row.label_ar,
        },
        title: {
          id: row.title_id,
          en: row.title_en,
          ar: row.title_ar,
        },
        description: {
          id: row.description_id,
          en: row.description_en,
          ar: row.description_ar,
        },
        serverTime: new Date().toISOString(),
        updatedAt: row.updated_at,
      },
    });
  } catch (err) {
    console.error('[CountdownController.getPublicCountdown]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Get Admin Countdown configuration with audit history
 * GET /api/admin/countdown
 */
const getAdminCountdown = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM countdown_settings ORDER BY id ASC LIMIT 1');

    if (rows.length === 0) {
      return errorResponse(res, { statusCode: 404, message: 'Data konfigurasi hitung mundur tidak ditemukan.' });
    }

    const countdown = rows[0];

    // Fetch recent audit logs for countdown
    const [auditRows] = await pool.query(
      `SELECT id, admin_email, action, details, ip_address, created_at 
       FROM audit_logs 
       WHERE module = 'countdown' 
       ORDER BY created_at DESC LIMIT 15`
    );

    return successResponse(res, {
      message: 'Data hitung mundur dan riwayat audit berhasil diambil.',
      data: {
        countdown: {
          ...countdown,
          is_active: Boolean(countdown.is_active),
        },
        serverTime: new Date().toISOString(),
        auditHistory: auditRows,
      },
    });
  } catch (err) {
    console.error('[CountdownController.getAdminCountdown]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Update Countdown configuration (Admin only)
 * PUT /api/admin/countdown
 */
const updateCountdown = async (req, res) => {
  try {
    const {
      target_date,
      is_active,
      label_id,
      label_en,
      label_ar,
      title_id,
      title_en,
      title_ar,
      description_id,
      description_en,
      description_ar,
    } = req.body;

    if (!target_date) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Tanggal target hitung mundur (target_date) wajib diisi.',
      });
    }

    const pool = getPool();
    const [oldRows] = await pool.query('SELECT * FROM countdown_settings ORDER BY id ASC LIMIT 1');

    if (oldRows.length === 0) {
      return errorResponse(res, { statusCode: 404, message: 'Data konfigurasi hitung mundur tidak ditemukan.' });
    }

    const oldData = oldRows[0];
    const targetDateFormatted = new Date(target_date).toISOString().slice(0, 19).replace('T', ' ');

    await pool.query(
      `UPDATE countdown_settings SET
        target_date = ?,
        is_active = ?,
        label_id = ?,
        label_en = ?,
        label_ar = ?,
        title_id = ?,
        title_en = ?,
        title_ar = ?,
        description_id = ?,
        description_en = ?,
        description_ar = ?,
        updated_by = ?
       WHERE id = ?`,
      [
        targetDateFormatted,
        is_active ? 1 : 0,
        label_id || oldData.label_id,
        label_en || oldData.label_en,
        label_ar || oldData.label_ar,
        title_id || oldData.title_id,
        title_en || oldData.title_en,
        title_ar || oldData.title_ar,
        description_id || oldData.description_id,
        description_en || oldData.description_en,
        description_ar || oldData.description_ar,
        req.user.email,
        oldData.id,
      ]
    );

    // Record Audit Log with old and new values
    const changes = {
      previous: {
        target_date: oldData.target_date,
        is_active: Boolean(oldData.is_active),
        title_id: oldData.title_id,
      },
      updated: {
        target_date: targetDateFormatted,
        is_active: Boolean(is_active),
        title_id: title_id || oldData.title_id,
      },
    };

    await logAudit(req, {
      action: 'COUNTDOWN_UPDATED',
      module: 'countdown',
      record_id: oldData.id,
      details: changes,
    });

    const [updatedRows] = await pool.query('SELECT * FROM countdown_settings WHERE id = ?', [oldData.id]);

    return successResponse(res, {
      message: 'Konfigurasi hitung mundur berhasil diperbarui dan diaudit.',
      data: {
        countdown: {
          ...updatedRows[0],
          is_active: Boolean(updatedRows[0].is_active),
        },
      },
    });
  } catch (err) {
    console.error('[CountdownController.updateCountdown]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

module.exports = {
  getPublicCountdown,
  getAdminCountdown,
  updateCountdown,
};
