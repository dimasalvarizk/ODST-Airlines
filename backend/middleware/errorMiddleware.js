const { errorResponse } = require('../utils/response');

const notFoundHandler = (req, res, next) => {
  return errorResponse(res, {
    statusCode: 404,
    message: `Rute '${req.originalUrl}' tidak ditemukan pada server API.`,
  });
};

const errorHandler = (err, req, res, next) => {
  console.error('[Error Handler]', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Terjadi kesalahan pada internal server.';

  if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    message = 'Koneksi ke MySQL Database gagal (ECONNREFUSED pada 127.0.0.1:3306). Pastikan Docker Desktop & container MySQL (docker compose up -d mysql) atau MySQL Server lokal sudah berjalan.';
  }

  return errorResponse(res, {
    statusCode,
    message,
    errors: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
