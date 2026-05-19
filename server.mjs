import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChatReply } from './lib/openrouter-chat.js';

const root = fileURLToPath(new URL('.', import.meta.url));

async function loadEnv() {
  try {
    const env = await readFile(join(root, '.env'), 'utf8');
    for (const line of env.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
    }
  } catch {
    // .env is optional. Production platforms inject variables themselves.
  }
}

await loadEnv();
const port = Number(process.env.PORT || 3000);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf'
};

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 50_000) throw new Error('Payload trop volumineux');
  }
  return raw ? JSON.parse(raw) : {};
}

async function handleChat(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { error: 'Méthode non autorisée' });
    return;
  }
  try {
    const body = await readJson(req);
    const reply = await createChatReply(body.messages || []);
    json(res, 200, { reply });
  } catch (error) {
    json(res, error.status || 500, { error: error.message || 'Erreur IA' });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname === '/' ? '/Chronos.html' : url.pathname);
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const filePath = join(root, safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    const content = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': types[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': filePath.endsWith('.html') ? 'no-store' : 'public, max-age=3600'
    });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}

createServer((req, res) => {
  if (req.url?.startsWith('/api/chat')) {
    handleChat(req, res);
    return;
  }
  serveStatic(req, res);
}).listen(port, () => {
  console.log(`Chronos disponible sur http://localhost:${port}`);
});
