import react from '@vitejs/plugin-react';
import crypto from 'crypto';
import https from 'https';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function mailchimpApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'mailchimp-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/subscribe', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const email = (parsed.email || '').trim().toLowerCase();
            const fullName = (parsed.name || '').trim();

            if (!email || !email.includes('@')) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Valid email address is required' }));
              return;
            }

            const apiKey = env.MAILCHIMP_API_KEY || process.env.MAILCHIMP_API_KEY || '';
            const serverPrefix = env.MAILCHIMP_SERVER_PREFIX || process.env.MAILCHIMP_SERVER_PREFIX || 'us11';
            const listId = env.MAILCHIMP_AUDIENCE_ID || process.env.MAILCHIMP_AUDIENCE_ID || '';

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
                res.statusCode = isSuccess ? 200 : (mcRes.statusCode || 500);
                res.setHeader('Content-Type', 'application/json');
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
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message || 'Internal server error' }));
            });

            mcReq.write(payload);
            mcReq.end();
          } catch (err: any) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err?.message || 'Invalid JSON body' }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), mailchimpApiPlugin(env)],
  };
});

