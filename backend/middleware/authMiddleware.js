const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');
const { getPool } = require('../config/db');

/**
 * Protect routes requiring admin authentication
 */
const protect = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, {
      statusCode: 401,
      message: 'Akses ditolak. Token otentikasi tidak ditemukan.',
    });
  }

  try {
    const decoded = verifyToken(token);
    const pool = getPool();

    const [rows] = await pool.query(
      'SELECT id, username, email, role, created_at FROM admins WHERE id = ? LIMIT 1',
      [decoded.id]
    );

    if (rows.length === 0) {
      return errorResponse(res, {
        statusCode: 401,
        message: 'Pengguna tidak valid atau telah dihapus.',
      });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    return errorResponse(res, {
      statusCode: 401,
      message: 'Sesi kedaluwarsa atau token tidak valid. Silakan login kembali.',
    });
  }
};

module.exports = {
  protect,
};
