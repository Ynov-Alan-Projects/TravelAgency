# Chronos — TimeTravel Agency

Webapp interactive pour une agence fictive de voyage temporel de luxe. Trois destinations immersives — Paris 1889, Crétacé, Florence 1504 — un quiz de recommandation personnalisée, un formulaire de réservation avec validation et un chatbot IA conversationnel branché sur OpenRouter.

Projet pédagogique réalisé avec une assistance IA générative pour la maquette, le code et le moteur conversationnel.

## 🛠️ Stack Technique

- HTML5, CSS3 (variables, oklch, glassmorphism, backdrop-filter)
- JavaScript vanilla + Canvas 2D (champ stellaire animé)
- React 18 via CDN + Babel Standalone (chatbot)
- Node.js >= 18 (serveur local, zéro dépendance npm externe)
- OpenRouter API (chat completions, modèle gratuit configurable)
- Hébergement cible : Vercel (`api/chat.js` au format serverless natif)
- Police : Cormorant Garamond + Space Grotesk + JetBrains Mono (Google Fonts)

## ✨ Features

- **Hero immersif** — canvas starfield, nébuleuses, vignette, animations d'entrée séquencées
- **Galerie 3 destinations** — cards glass avec vidéos `<video autoplay muted loop>` locales
- **Section parcours** — quatre phases (Conseil, Préparation, Départ, Retour)
- **Quiz de recommandation** — 3 préférences → score → meilleure destination
- **Formulaire de réservation** — destination, date, voyageurs, validation client-side
- **Chatbot Lumen** — widget flottant React, appel réel `/api/chat` → OpenRouter
- **Rate limiting** — limiteur fenêtre fixe par IP sur `/api/chat` (10 req/min par défaut)
- **Responsive** — desktop 3 colonnes, mobile colonne unique, chat plein largeur
- **Animations** — reveal au scroll (`IntersectionObserver`), micro-interactions hover, grain CSS

## 🤖 IA Utilisées

- **Maquette initiale** : Claude Design (Claude Opus) — direction artistique Apple × Interstellar
- **Code** : Claude Code (Claude Opus) — génération HTML/CSS/JS, refactor, intégration backend
- **Chatbot Lumen** : OpenRouter, modèle gratuit configurable (`z-ai/glm-4.5-air:free`, `nvidia/nemotron-nano-12b-v2-vl:free` ou `openrouter/free`)
- **Visuels destinations** : vidéos générées via Runway / Veo dans le cadre du projet 1 TimeTravel Agency

## 📥 Installation

Prérequis : Node.js 18+, clé OpenRouter (gratuite — créer un compte sur [openrouter.ai](https://openrouter.ai)).

```bash
# 1. Cloner et entrer dans le dossier
git clone <repo-url> TravelAgency
cd TravelAgency

# 2. Configurer la clé OpenRouter
cp .env.example .env
# Éditer .env et coller la clé dans OPENROUTER_API_KEY

# 3. Lancer le serveur local
npm start
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Variables d'environnement

| Variable | Défaut | Rôle |
|---|---|---|
| `OPENROUTER_API_KEY` | — | Obligatoire pour activer le chatbot |
| `OPENROUTER_MODEL` | `openrouter/auto` | Identifiant du modèle (utiliser un `:free` pour zéro coût) |
| `OPENROUTER_SITE_URL` | `http://localhost:3000` | Renvoyé en header OpenRouter |
| `OPENROUTER_APP_NAME` | `Chronos TimeTravel Agency` | Renvoyé en header OpenRouter |
| `PORT` | `3000` | Port du serveur local |
| `CHAT_RATE_LIMIT` | `10` | Requêtes max par IP sur la fenêtre |
| `CHAT_RATE_WINDOW_MS` | `60000` | Durée de la fenêtre en millisecondes |

### Sans clé OpenRouter

Le site fonctionne, mais le chatbot répond `Configuration IA en cours : OPENROUTER_API_KEY manquante`.

## ⚠️ Limitations du chatbot

Le chatbot Lumen repose sur un **modèle gratuit OpenRouter**. Conséquences à connaître :

- **Latence variable** — la réponse peut prendre plusieurs secondes (parfois 10–20 s) selon la charge du provider gratuit.
- **Indisponibilité ponctuelle** — les modèles gratuits sont partagés entre tous les utilisateurs OpenRouter. Si le provider est saturé, l'API renvoie `429 Provider returned error` et le chat affiche `Configuration IA en cours : ...`. Il suffit en général de réessayer quelques secondes plus tard.
- **Quota quotidien** — OpenRouter limite les requêtes gratuites par compte (~50 req/jour sur la plupart des modèles `:free` sans crédit). Au-delà, ajouter quelques euros de crédit OpenRouter ou patienter le reset quotidien.
- **Rate limiting interne** — l'endpoint `/api/chat` plafonne à 10 requêtes par minute par IP (paramétrable via `CHAT_RATE_LIMIT`) pour éviter de cramer le quota OpenRouter.

## 🚀 Déploiement Vercel

```bash
npm i -g vercel
vercel login
vercel
# puis ajouter les variables d'environnement via le dashboard ou :
vercel env add OPENROUTER_API_KEY production
vercel --prod
```

Le fichier `vercel.json` configure le rewrite racine vers `Chronos.html` et les headers de cache pour `/img/`.

## 📁 Structure

```
TravelAgency/
├── Chronos.html              # page principale (single-page app)
├── index.html                # redirection vers Chronos.html
├── server.mjs                # serveur Node local
├── api/chat.js               # endpoint serverless Vercel /api/chat
├── lib/
│   ├── openrouter-chat.js    # client OpenRouter + prompt système
│   └── rate-limit.js         # limiteur in-memory par IP
├── img/                      # vidéos et visuels destinations
├── docs/screenshots/         # captures pour le rapport
├── RAPPORT.md                # rapport détaillé Moodle
├── vercel.json               # config déploiement
└── .env.example              # gabarit configuration
```

## 🙏 Crédits

- **OpenRouter** — agrégateur d'API LLM ([openrouter.ai](https://openrouter.ai))
- **Z.AI / Meta / NVIDIA / Google** — modèles open-weights utilisés via OpenRouter
- **Google Fonts** — Cormorant Garamond, Space Grotesk, JetBrains Mono
- **React** + **Babel Standalone** — chargés via unpkg
- **Claude (Anthropic)** — maquette, code, accompagnement
- **Assets vidéo** — Runway / Veo (projet TimeTravel Agency v1)

## 📄 Licence

Projet pédagogique — Ynov M1/M2 Digital & IA. Usage non commercial.
