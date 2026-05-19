import { createChatReply } from '../lib/openrouter-chat.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  try {
    const reply = await createChatReply(req.body?.messages || []);
    res.status(200).json({ reply });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Erreur IA' });
  }
}
