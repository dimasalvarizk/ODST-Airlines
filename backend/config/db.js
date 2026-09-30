const mysql = require('mysql2/promise');
const config = require('./config');
const { hashPassword } = require('../utils/hash');

let pool = null;

/**
 * Get active MySQL connection pool
 */
const getPool = () => {
  if (!pool) {
    pool = mysql.createPool(config.db);
  }
  return pool;
};

/**
 * Initialize database, create tables if not exist, and seed initial records
 */
const initDatabase = async () => {
  console.log('[Database] Initializing MySQL connection...');

  // First connect without specifying database to create database if not exists
  let tempConn;
  try {
    tempConn = await mysql.createConnection({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
    });

    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${config.db.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`[Database] Database '${config.db.database}' ensured.`);
  } catch (err) {
    console.warn(`[Database] Notice: Initial DB creation check: ${err.message}`);
  } finally {
    if (tempConn) await tempConn.end();
  }

  // Connect to the actual database pool
  const dbPool = getPool();

  // Test pool connection
  const connection = await dbPool.getConnection();
  console.log('[Database] Connected to MySQL successfully.');

  try {
    // 1. Table: admins
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(191) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'superadmin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Table: countdown_settings (Audit & Controls for Launch Countdown)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS countdown_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        target_date DATETIME NOT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        label_id VARCHAR(255) DEFAULT 'Bersiap Lepas Landas',
        label_en VARCHAR(255) DEFAULT 'Prepare for Takeoff',
        label_ar VARCHAR(255) DEFAULT 'استعدوا للإقلاع',
        title_id VARCHAR(255) DEFAULT 'Hitung Mundur Dimulai',
        title_en VARCHAR(255) DEFAULT 'The Countdown Begins Here',
        title_ar VARCHAR(255) DEFAULT 'العدّ التنازلي يبدأ هنا',
        description_id TEXT,
        description_en TEXT,
        description_ar TEXT,
        updated_by VARCHAR(100) DEFAULT 'system',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Table: contact_inquiries (Contact Form Submissions & Audit Status)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(191) NOT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        subject VARCHAR(255) DEFAULT NULL,
        message TEXT NOT NULL,
        status ENUM('new', 'in_progress', 'replied', 'resolved', 'archived') NOT NULL DEFAULT 'new',
        admin_notes TEXT DEFAULT NULL,
        ip_address VARCHAR(100) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Table: contact_info (Official company contact settings)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(255) DEFAULT 'ODST Airlines',
        division VARCHAR(255) DEFAULT 'Aviation & Charter',
        phone VARCHAR(50) DEFAULT '+62 81111 202220',
        phone_tel VARCHAR(50) DEFAULT '+6281111202220',
        email VARCHAR(191) DEFAULT 'info@odst.id',
        address TEXT,
        map_embed_url TEXT,
        map_direct_url TEXT,
        updated_by VARCHAR(100) DEFAULT 'system',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Table: audit_logs (Complete audit trail for all admin actions)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT DEFAULT NULL,
        admin_email VARCHAR(191) DEFAULT NULL,
        action VARCHAR(100) NOT NULL,
        module ENUM('auth', 'countdown', 'contact', 'contact_info', 'system') NOT NULL,
        record_id VARCHAR(100) DEFAULT NULL,
        details JSON DEFAULT NULL,
        ip_address VARCHAR(100) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_module (module),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Seed default admin if none exists
    const [adminRows] = await connection.query('SELECT id, email FROM admins LIMIT 1');
    if (adminRows.length === 0) {
      if (config.adminSeed.password) {
        const hashed = await hashPassword(config.adminSeed.password);
        await connection.query(
          'INSERT INTO admins (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
          [config.adminSeed.username, config.adminSeed.email, hashed, 'superadmin']
        );
        console.log(`[Database Seed] Default admin created: ${config.adminSeed.email}`);
      } else {
        console.warn('[Database Seed] Notice: No ADMIN_DEFAULT_PASSWORD provided in .env to seed initial admin.');
      }
    }

    // Seed default countdown if none exists
    const [countdownRows] = await connection.query('SELECT id FROM countdown_settings LIMIT 1');
    if (countdownRows.length === 0) {
      // Default target date: 60 days from now
      const defaultTarget = new Date();
      defaultTarget.setDate(defaultTarget.getDate() + 60);
      const targetDateStr = defaultTarget.toISOString().slice(0, 19).replace('T', ' ');

      await connection.query(`
        INSERT INTO countdown_settings (
          target_date, is_active,
          label_id, label_en, label_ar,
          title_id, title_en, title_ar,
          description_id, description_en, description_ar,
          updated_by
        ) VALUES (
          ?, 1,
          'Bersiap Lepas Landas', 'Prepare for Takeoff', 'استعدوا للإقلاع',
          'Hitung Mundur Dimulai', 'The Countdown Begins Here', 'العدّ التنازلي يبدأ هنا',
          'Jadwal peluncuran dan operasional perdana akan segera diumumkan melalui kanal resmi ODST.',
          'Official launch dates and operations will be announced soon across ODST official channels.',
          'موعد الإطلاق وتفاصيله سيُعلن عنها قريباً عبر قنوات أوديست الرسمية.',
          'system_seed'
        )
      `, [targetDateStr]);
      console.log('[Database Seed] Default countdown configuration created.');
    }

    // Seed default contact info if none exists
    const [contactInfoRows] = await connection.query('SELECT id FROM contact_info LIMIT 1');
    if (contactInfoRows.length === 0) {
      await connection.query(`
        INSERT INTO contact_info (
          company_name, division, phone, phone_tel, email, address, map_embed_url, map_direct_url, updated_by
        ) VALUES (
          'ODST Airlines',
          'Aviation & Charter',
          '+62 81111 202220',
          '+6281111202220',
          'info@odst.id',
          'Graha Al Badgel Jl. Hajjah Tutty Alawiyah No.7, RT.2/RW.5, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, Indonesia 12740',
          'https://maps.google.com/maps?q=Graha+Al+Badgel+Jl.+Hajjah+Tutty+Alawiyah+No.7+Jakarta&t=&z=16&ie=UTF8&iwloc=&output=embed',
          'https://www.google.com/maps/search/?api=1&query=Graha+Al+Badgel+Jl.+Hajjah+Tutty+Alawiyah+No.7+Jakarta',
          'system_seed'
        )
      `);
      console.log('[Database Seed] Default contact info created.');
    }

    console.log('[Database] All schemas and seeds initialized successfully.');
  } finally {
    connection.release();
  }
};

module.exports = {
  getPool,
  initDatabase,
};
