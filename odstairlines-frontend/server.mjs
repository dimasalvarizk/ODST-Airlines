import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import crypto from 'crypto';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const BACKEND_URL = process.env.BACKEND_URL || process.env.VITE_API_URL || 'http://backend:5000';
const DIST_DIR = path.join(__dirname, 'dist');

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain; charset=UTF-8',
};

// Handle Proxy to Backend API
function proxyToBackend(req, res, targetUrl) {
  const backendParsed = new URL(targetUrl);
  const isHttps = backendParsed.protocol === 'https:';
  const clientLib = isHttps ? https : http;

  const options = {
    hostname: backendParsed.hostname,
    port: backendParsed.port || (isHttps ? 443 : 80),
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: backendParsed.host,
      'x-forwarded-for': req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      'x-forwarded-proto': isHttps ? 'https' : 'http',
    },
  };

  const proxyReq = clientLib.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('[Backend Proxy Error]', err.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Backend service unavailable', error: err.message }));
    }
  });

  req.pipe(proxyReq);
}

// Handle Mailchimp Subscription API
function handleSubscribe(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 1e6) {
      req.socket.destroy();
    }
  });

  req.on('end', () => {
    try {
      const parsed = JSON.parse(body || '{}');
      const email = (parsed.email || '').trim().toLowerCase();
      const fullName = (parsed.name || '').trim();

      if (!email || !email.includes('@')) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Valid email address is required' }));
        return;
      }

      const apiKey = process.env.MAILCHIMP_API_KEY || '';
      const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us11';
      const listId = process.env.MAILCHIMP_AUDIENCE_ID || '';

      if (!apiKey || !listId) {
        console.warn('[Mailchimp] API Key or Audience ID not set in environment variables');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Registration received successfully' }));
        return;
      }

      const nameParts = fullName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const subscriberHash = crypto.createHash('md5').update(email).digest('hex');

      const payload = JSON.stringify({
        email_address: email,
        status_if_new: 'subscribed',
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      });

      const options = {
        hostname: `${serverPrefix}.api.mailchimp.com`,
        path: `/3.0/lists/${listId}/members/${subscriberHash}`,
        method: 'PUT',
        headers: {
          Authorization: 'Basic ' + Buffer.from('any:' + apiKey).toString('base64'),
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      };

      const mcReq = https.request(options, (mcRes) => {
        let responseData = '';
        mcRes.on('data', (chunk) => {
          responseData += chunk;
        });

        mcRes.on('end', () => {
          const isSuccess = mcRes.statusCode && mcRes.statusCode >= 200 && mcRes.statusCode < 300;
          res.writeHead(isSuccess ? 200 : (mcRes.statusCode || 500), { 'Content-Type': 'application/json' });
          if (isSuccess) {
            res.end(JSON.stringify({ success: true, message: 'Successfully subscribed to ODST launch updates' }));
          } else {
            try {
              const parsedError = JSON.parse(responseData);
              res.end(JSON.stringify({ success: false, error: parsedError.detail || parsedError.title || 'Subscription failed' }));
            } catch {
              res.end(JSON.stringify({ success: false, error: 'Mailchimp API request failed' }));
            }
          }
        });
      });

      mcReq.on('error', (err) => {
        console.error('[Mailchimp Error]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message || 'Internal server error' }));
      });

      mcReq.write(payload);
      mcReq.end();
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err?.message || 'Invalid request body' }));
    }
  });
}

// Serve Static Files with Compression & Caching
function serveStatic(req, res, filePath, isSpaFallback = false) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (!isSpaFallback) {
        const indexHtml = path.join(DIST_DIR, 'index.html');
        return serveStatic(req, res, indexHtml, true);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    let cacheControl = 'public, max-age=3600';
    if (filePath.includes(path.sep + 'assets' + path.sep)) {
      cacheControl = 'public, max-age=31536000, immutable';
    } else if (ext === '.html') {
      cacheControl = 'no-cache, no-store, must-revalidate';
    }

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };

    const acceptEncoding = req.headers['accept-encoding'] || '';
    const rawStream = fs.createReadStream(filePath);

    const isCompressible = /text|javascript|json|xml|svg/i.test(contentType);

    if (isCompressible && acceptEncoding.includes('gzip')) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      rawStream.pipe(zlib.createGzip()).pipe(res);
    } else if (isCompressible && acceptEncoding.includes('deflate')) {
      headers['Content-Encoding'] = 'deflate';
      res.writeHead(200, headers);
      rawStream.pipe(zlib.createDeflate()).pipe(res);
    } else {
      headers['Content-Length'] = stats.size;
      res.writeHead(200, headers);
      rawStream.pipe(res);
    }
  });
}

// HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Healthcheck for Coolify / VPS Docker health monitoring
  if (pathname === '/health' || pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  // API Routes - Mailchimp Subscription
  if (pathname === '/api/subscribe') {
    handleSubscribe(req, res);
    return;
  }

  // API Routes - Forward to Backend API
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/countdown') ||
    pathname.startsWith('/api/contact') ||
    pathname.startsWith('/api/admin')
  ) {
    proxyToBackend(req, res, BACKEND_URL);
    return;
  }

  // Sanitize path to prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let targetFile = path.join(DIST_DIR, safePath);

  // If directory, look for index.html
  if (safePath.endsWith('/') || !path.extname(safePath)) {
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).isDirectory()) {
      targetFile = path.join(targetFile, 'index.html');
    }
  }

  serveStatic(req, res, targetFile);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[ODST Airlines] Production server running on http://0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('[ODST Airlines] SIGTERM received. Closing server gracefully...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('[ODST Airlines] SIGINT received. Closing server...');
  server.close(() => process.exit(0));
});
