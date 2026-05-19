const SYSTEM_PROMPT = `
Tu es Lumen, assistant virtuel de Chronos, agence fictive de voyage temporel de luxe.
Objectif : conseiller les visiteurs en francais sur Paris 1889, le Cretace et Florence 1504.
Ton : professionnel, chaleureux, clair, jamais familier.
Destinations :
- Paris 1889 : Belle Epoque, Tour Eiffel, Exposition Universelle, 14 jours, des 2,4M€.
- Cretace : dinosaures, nature primitive, observation securisee, 9 jours, des 6,8M€.
- Florence 1504 : Renaissance, art, architecture, Michel-Ange, 12 jours, des 3,9M€.
Regles :
- Reponds en 3 a 6 phrases maximum.
- Si la question concerne la securite, explique l'ancrage temporel et le retour controle.
- Si la question concerne la reservation, indique qu'un conseiller valide la destination, la date et le nombre de voyageurs.
- Ne promets jamais un vrai voyage temporel dans le monde reel : presente l'experience comme fictive dans le cadre du projet.
`.trim();

function normalizeMessages(messages = []) {
  return messages
    .filter(message => message && typeof message.content === 'string')
    .slice(-8)
    .map(message => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: message.content.slice(0, 1200)
    }));
}

export async function createChatReply(messages, env = process.env) {
  const apiKey = env.OPENROUTER_API_KEY;
  if (!apiKey) {
    const error = new Error('OPENROUTER_API_KEY manquante');
    error.status = 503;
    throw error;
  }

  const model = env.OPENROUTER_MODEL || 'openrouter/auto';
  const body = {
    model,
    temperature: 0.55,
    max_tokens: 260,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...normalizeMessages(messages)
    ]
  };

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': env.OPENROUTER_SITE_URL || 'http://localhost:3000',
      'X-Title': env.OPENROUTER_APP_NAME || 'Chronos TimeTravel Agency'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error?.message || data.message || 'Erreur API OpenRouter');
    error.status = response.status;
    throw error;
  }

  return data.choices?.[0]?.message?.content?.trim() || '';
}
