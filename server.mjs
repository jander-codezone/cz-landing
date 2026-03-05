import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handler } from './dist/server/entry.mjs';

const CLIENT_DIR = join(fileURLToPath(new URL('.', import.meta.url)), 'dist/client');

const MIME_TYPES = {
  '.html':  'text/html; charset=utf-8',
  '.css':   'text/css',
  '.js':    'text/javascript',
  '.mjs':   'text/javascript',
  '.json':  'application/json',
  '.svg':   'image/svg+xml',
  '.png':   'image/png',
  '.jpg':   'image/jpeg',
  '.jpeg':  'image/jpeg',
  '.webp':  'image/webp',
  '.avif':  'image/avif',
  '.woff2': 'font/woff2',
  '.woff':  'font/woff',
  '.ico':   'image/x-icon',
  '.txt':   'text/plain',
  '.xml':   'text/xml',
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  // Prevent path traversal attacks
  const safePath = normalize(url.pathname).replace(/^(\.\.[/\\])+/, '');
  const filePath = join(CLIENT_DIR, safePath);

  if (!filePath.startsWith(CLIENT_DIR)) {
    res.writeHead(403);
    res.end();
    return;
  }

  try {
    const info = await stat(filePath);
    if (info.isFile()) {
      const ext = extname(filePath).toLowerCase();
      const body = await readFile(filePath);
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] ?? 'application/octet-stream',
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(body);
      return;
    }
  } catch {
    // Not a static asset — hand off to Astro SSR
  }

  handler(req, res, () => {
    res.writeHead(404);
    res.end('Not Found');
  });
});

const PORT = Number(process.env.PORT ?? 4321);
const HOST = process.env.HOST ?? '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
