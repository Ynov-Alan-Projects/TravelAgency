import { createChatReply } from '../lib/openrouter-chat.js';
import { consumeRateLimit } from '../lib/rate-limit.js';

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  const limit = consumeRateLimit(clientKey(req));
  res.setHeader('X-RateLimit-Limit', String(limit.limit));
  res.setHeader('X-RateLimit-Remaining', String(limit.remaining));
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    res.status(429).json({ error: `Trop de requêtes. Réessayez dans ${limit.retryAfter}s.` });
    return;
  }

  try {
    const reply = await createChatReply(req.body?.messages || []);
    res.status(200).json({ reply });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Erreur IA' });
  }
}
