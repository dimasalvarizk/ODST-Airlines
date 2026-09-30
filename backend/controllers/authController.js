const { getPool } = require('../config/db');
const { comparePassword, hashPassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/response');
const { logAudit } = require('../services/auditService');

/**
 * Admin Login
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Email/Username dan Kata Sandi wajib diisi.',
      });
    }

    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, username, email, password_hash, role FROM admins WHERE email = ? OR username = ? LIMIT 1',
      [emailOrUsername.trim().toLowerCase(), emailOrUsername.trim()]
    );

    if (rows.length === 0) {
      await logAudit(req, {
        action: 'LOGIN_FAILED',
        module: 'auth',
        details: { reason: 'User not found', identifier: emailOrUsername },
      });
      return errorResponse(res, {
        statusCode: 401,
        message: 'Kredensial tidak valid. Silakan periksa email/username dan kata sandi Anda.',
      });
    }

    const admin = rows[0];
    const isMatch = await comparePassword(password, admin.password_hash);

    if (!isMatch) {
      await logAudit(req, {
        action: 'LOGIN_FAILED',
        module: 'auth',
        record_id: admin.id,
        user: admin,
        details: { reason: 'Invalid password' },
      });
      return errorResponse(res, {
        statusCode: 401,
        message: 'Kredensial tidak valid. Silakan periksa email/username dan kata sandi Anda.',
      });
    }

    // Generate JWT Token
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    });

    // Record Audit Log for successful login
    await logAudit(req, {
      action: 'LOGIN_SUCCESS',
      module: 'auth',
      record_id: admin.id,
      user: admin,
      details: { role: admin.role },
    });

    return successResponse(res, {
      message: 'Login berhasil.',
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (err) {
    console.error('[AuthController.login]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

/**
 * Get current authenticated admin profile
 * GET /api/auth/me
 */
const getMe = async (req, res) => {
  return successResponse(res, {
    message: 'Data profil admin berhasil diambil.',
    data: {
      admin: req.user,
    },
  });
};

/**
 * Change admin password
 * POST /api/auth/change-password
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Kata sandi saat ini dan kata sandi baru wajib diisi.',
      });
    }

    if (newPassword.length < 8) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Kata sandi baru minimal harus 8 karakter.',
      });
    }

    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, password_hash FROM admins WHERE id = ? LIMIT 1',
      [req.user.id]
    );

    if (rows.length === 0) {
      return errorResponse(res, { statusCode: 404, message: 'Admin tidak ditemukan.' });
    }

    const isMatch = await comparePassword(currentPassword, rows[0].password_hash);
    if (!isMatch) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Kata sandi saat ini yang Anda masukkan salah.',
      });
    }

    const newHashed = await hashPassword(newPassword);
    await pool.query('UPDATE admins SET password_hash = ? WHERE id = ?', [newHashed, req.user.id]);

    await logAudit(req, {
      action: 'PASSWORD_CHANGED',
      module: 'auth',
      record_id: req.user.id,
      details: { timestamp: new Date().toISOString() },
    });

    return successResponse(res, {
      message: 'Kata sandi berhasil diperbarui.',
    });
  } catch (err) {
    console.error('[AuthController.changePassword]', err);
    return errorResponse(res, { statusCode: 500, message: err.message });
  }
};

module.exports = {
  login,
  getMe,
  changePassword,
};
