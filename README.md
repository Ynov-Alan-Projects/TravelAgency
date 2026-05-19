# Chronos - TimeTravel Agency

Webapp interactive pour une agence fictive de voyage temporel : Paris 1889, Cretace, Florence 1504.

## Lancer le projet

```bash
cd /Users/julescavanier/Desktop/TravelAgency
cp .env.example .env
# Ajouter la cle OpenRouter dans .env pour activer le chatbot IA
npm start
```

Ouvrir : `http://localhost:3000`

## Etat du projet

- Interface web : REALISE
- Assets locaux : REALISE
- Recommandation personnalisee : REALISE
- Formulaire reservation avec validation locale : REALISE
- Chatbot IA reel via OpenRouter : REALISE cote code, EN COURS cote cle API
- Deploiement public : EN COURS
- Noms des 4 membres : EN COURS

## Livrables

- Site : `Chronos.html`
- Serveur local : `server.mjs`
- API chatbot : `api/chat.js`
- Rapport detaille : `RAPPORT.md`
- Captures : `docs/screenshots/`

## Variables d'environnement

```bash
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=openrouter/auto
OPENROUTER_SITE_URL=http://localhost:3000
OPENROUTER_APP_NAME=Chronos TimeTravel Agency
PORT=3000
CHAT_RATE_LIMIT=10
CHAT_RATE_WINDOW_MS=60000
```

## Deploiement Vercel

Le projet est compatible avec Vercel comme site statique avec une API serverless dans `api/chat.js`.

Avant de deployer, verifier que les variables suivantes sont configurees dans Vercel :

```bash
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=openrouter/auto
OPENROUTER_SITE_URL=https://ton-site.vercel.app
OPENROUTER_APP_NAME=Chronos TimeTravel Agency
CHAT_RATE_LIMIT=10
CHAT_RATE_WINDOW_MS=60000
```

Les fichiers lourds non utilises par l'interface sont exclus du deploiement via `.vercelignore` pour rester compatible avec les limites pratiques de Vercel Hobby.

Commandes de deploiement :

```bash
vercel
vercel --prod
```

## Moodle

- Ajouter les noms/prenoms des 4 membres dans `RAPPORT.md`.
- Deployer le projet, puis ajouter l'URL publique dans le rapport.
- Chaque membre depose individuellement le meme rendu.
