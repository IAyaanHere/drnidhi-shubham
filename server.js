#!/usr/bin/env node
/**
 * Local Server for Recovered Wedding Invitation (Dr. Nidhi & Shubham)
 * Zero external dependencies - standard Node.js built-ins only.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PRIMARY_PORT = parseInt(process.env.PORT || '6000', 10);
const FALLBACK_PORT_1 = 6001;
const FALLBACK_PORT_2 = 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
};

function sendFile(req, res, filePath, contentType) {
  try {
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => {
      console.error('Stream error:', err.message);
      if (!res.headersSent) res.writeHead(500);
      res.end();
    });
    stream.pipe(res);
  } catch (err) {
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
}

const requestHandler = (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Mock API endpoints
    if (pathname.startsWith('/api/geo')) {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      return res.end(JSON.stringify({ country: 'IN', city: 'Mumbai', isEU: false }));
    }

    if (pathname === '/tr' || pathname === '/tr/' || pathname.startsWith('/api/client-errors')) {
      res.writeHead(204, { 'Access-Control-Allow-Origin': '*' });
      return res.end();
    }

    if (pathname.startsWith('/g9df/')) {
      res.writeHead(200, { 'Content-Type': 'application/javascript', 'Access-Control-Allow-Origin': '*' });
      return res.end('// GTM Mock');
    }

    // Direct opened view
    if (pathname === '/opened' || parsedUrl.query.opened === 'true') {
      const openedPath = path.join(ROOT_DIR, 'opened.html');
      if (fs.existsSync(openedPath)) {
        return sendFile(req, res, openedPath, 'text/html; charset=utf-8');
      }
    }

    // Primary wedding invitation view
    if (pathname === '/' || pathname === '/index.html' || pathname === '/i/drnidhi-shubham' || pathname === '/i/drnidhi-shubham/') {
      // Check i/drnidhi-shubham.html or index.html
      const invitePath = path.join(ROOT_DIR, 'i', 'drnidhi-shubham.html');
      const targetHtml = fs.existsSync(invitePath) ? invitePath : path.join(ROOT_DIR, 'index.html');
      return sendFile(req, res, targetHtml, 'text/html; charset=utf-8');
    }

    // Direct file check
    let relativePath = pathname.replace(/^\/+/, '');
    let filePath = path.join(ROOT_DIR, relativePath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      return sendFile(req, res, filePath, MIME_TYPES[ext] || 'application/octet-stream');
    }

    // Fallback subdirs check (/fonts, /images, /uploads, /i)
    const subdirs = ['fonts', 'images', 'uploads', 'i'];
    for (const sub of subdirs) {
      const testPath = path.join(ROOT_DIR, sub, path.basename(filePath));
      if (fs.existsSync(testPath) && fs.statSync(testPath).isFile()) {
        const ext = path.extname(testPath).toLowerCase();
        return sendFile(req, res, testPath, MIME_TYPES[ext] || 'application/octet-stream');
      }
    }

    // Fallback Next.js routing
    if (pathname.startsWith('/i/')) {
      const fallbackPath = path.join(ROOT_DIR, 'index.html');
      return sendFile(req, res, fallbackPath, 'text/html; charset=utf-8');
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + pathname);
  } catch (err) {
    console.error('Server error:', err);
    if (!res.headersSent) res.writeHead(500);
    res.end('Internal Server Error');
  }
};

// Create server on Primary Port (6000)
const server6000 = http.createServer(requestHandler);
server6000.on('error', (err) => {
  console.error(`Port ${PRIMARY_PORT} error:`, err.message);
});
server6000.listen(PRIMARY_PORT, () => {
  console.log('='.repeat(65));
  console.log('  Wedding Invitation - Dr. Nidhi & Shubham (Local Server)');
  console.log('='.repeat(65));
  console.log(`  [Primary Port ${PRIMARY_PORT}]`);
  console.log(`  --> http://localhost:${PRIMARY_PORT}/i/drnidhi-shubham`);
  console.log(`  --> http://127.0.0.1:${PRIMARY_PORT}/i/drnidhi-shubham`);
  console.log('='.repeat(65));
});

// Also bind Fallback Ports for browsers (Chrome/Firefox block 6000 by default as X11 unsafe port)
if (PRIMARY_PORT !== FALLBACK_PORT_1) {
  const server6001 = http.createServer(requestHandler);
  server6001.on('error', () => {});
  server6001.listen(FALLBACK_PORT_1, () => {
    console.log(`  [Browser-Safe Mirror Port ${FALLBACK_PORT_1}]`);
    console.log(`  --> http://localhost:${FALLBACK_PORT_1}/i/drnidhi-shubham`);
  });
}

if (PRIMARY_PORT !== FALLBACK_PORT_2) {
  const server3000 = http.createServer(requestHandler);
  server3000.on('error', () => {});
  server3000.listen(FALLBACK_PORT_2, () => {
    console.log(`  [Browser-Safe Mirror Port ${FALLBACK_PORT_2}]`);
    console.log(`  --> http://localhost:${FALLBACK_PORT_2}/i/drnidhi-shubham`);
  });
}
