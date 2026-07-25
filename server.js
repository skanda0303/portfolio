const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3030;
const LM_HOST = '127.0.0.1';
const LM_PORT = 1234;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Proxy API requests to LM Studio
  if (req.url.startsWith('/v1/')) {
    const proxyHeaders = { host: LM_HOST + ':' + LM_PORT };
    if (req.headers['content-type']) proxyHeaders['content-type'] = req.headers['content-type'];
    if (req.headers['content-length']) proxyHeaders['content-length'] = req.headers['content-length'];
    const options = {
      hostname: LM_HOST,
      port: LM_PORT,
      path: req.url,
      method: req.method,
      headers: proxyHeaders,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      const rh = { ...proxyRes.headers, 'Access-Control-Allow-Origin': '*' };
      res.writeHead(proxyRes.statusCode, rh);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (e) => {
      res.writeHead(502, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ error: { message: 'LM Studio unreachable: ' + e.message } }));
    });

    req.pipe(proxyReq);
    return;
  }

  // Serve static files
  const filePath = path.join(__dirname, req.url === '/' ? 'ocr-chat.html' : req.url);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('OCR Chat server running at http://localhost:' + PORT);
  console.log('Proxying API requests to LM Studio at http://' + LM_HOST + ':' + LM_PORT);
});
