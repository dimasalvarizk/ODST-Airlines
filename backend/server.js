const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const { initDatabase } = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const countdownRoutes = require('./routes/countdownRoutes');
const contactRoutes = require('./routes/contactRoutes');
const auditRoutes = require('./routes/auditRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Import middlewares
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigin === '*' ? true : config.corsOrigin.split(','),
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads directory if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check API
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ODST Airlines Backend API',
    version: '1.0.0',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ODST Airlines Backend API',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/countdown', countdownRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/audit', auditRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Database Initialization with Retry Loop (for Docker / slow DB boot)
const startServer = async () => {
  let connected = false;
  let retries = 10;

  while (!connected && retries > 0) {
    try {
      await initDatabase();
      connected = true;
      console.log('[Server] Database initialization completed.');
    } catch (err) {
      retries -= 1;
      console.error(`[Server] Database connection failed: ${err.message}. Retries left: ${retries}`);
      if (retries === 0) {
        console.error('[Server] Critical: Could not connect to MySQL database after multiple attempts.');
      } else {
        // Wait 3 seconds before next retry
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }

  const PORT = config.port;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🚀 ODST Airlines Backend Server running on port ${PORT}`);
    console.log(`🌐 Environment: ${config.env}`);
    console.log(`🔐 Default Admin: ${config.adminSeed.email}`);
    console.log(`=======================================================`);
  });
};

startServer();
