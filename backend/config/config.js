const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'odst_airlines',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'odst_default_jwt_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  adminSeed: {
    email: process.env.ADMIN_DEFAULT_EMAIL || 'info@odst.id',
    username: process.env.ADMIN_DEFAULT_USERNAME || 'admin',
    password: process.env.ADMIN_DEFAULT_PASSWORD || '',
  },
  corsOrigin: process.env.CORS_ORIGIN || '*',
};
