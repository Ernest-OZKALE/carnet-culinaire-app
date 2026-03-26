# 🍷 Carnet Culinaire Élite

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Supabase Backend](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Architecture Monorepo](https://img.shields.io/badge/Architecture-Monorepo-orange?style=for-the-badge)](./docs/ARCHITECTURE.md)
[![Localization](https://img.shields.io/badge/Language-Français-blue?style=for-the-badge)](./docs/LOCALIZATION.md)

**L'excellence gastronomique rencontre l'architecture logicielle de pointe.**

Carnet Culinaire Élite n'est pas seulement une application de critiques gastronomiques ; c'est une vitrine technologique conçue pour démontrer une maîtrise complète du stack moderne **React**, **Supabase** et **Vercel**, orchestrée au sein d'un monorepo rigoureux.

---

## 🏛️ Vision Architecturale

Mon approche repose sur trois piliers fondamentaux :

1.  **Robustesse & Scalabilité** : Migration d'une infrastructure Firebase vers un modèle relationnel PostgreSQL (Supabase), permettant des analyses de données plus fines et des performances accrues.
2.  **Intelligence Artificielle Locale & Cloud** : Intégration de modules d'analyse "Expert" (Palais Raffiné) et de suggestions prédictives (Radar à Pépites) via des Edge Functions.
3.  **Expérience Utilisateur Premium** : Une interface fluide, minimaliste et entièrement localisée, pensée pour les critiques gastronomiques les plus exigeants.

---

## 📂 Structure du Monorepo

```bash
/
├── apps/
│   └── client/         # Interface React 'Elite', authentification Supabase, IA locale
├── docs/
│   ├── ARCHITECTURE.md # Justification des choix techniques
│   └── DATA_MODEL.md  # Schéma PostgreSQL et politiques RLS
├── infrastructure/
│   └── supabase/       # Migrations SQL, configuration Edge Functions
└── scripts/
    └── maintenance/    # Outils de migration et de santé du système
```

---

## 🚀 Technologies Clés

- **Frontend** : React 18, Vanilla CSS (Design System sur mesure).
- **Backend-as-a-Service** : Supabase (Auth, DB Realtime, Storage).
- **IA** : Google Places API & Supabase Edge Functions.
- **Déploiement** : Vercel (CI/CD ultra-rapide).

---

## 🛠️ Installation & Développement

```bash
# Installation des dépendances à la racine
npm install

# Lancement du client en mode développement
npm run client:start
```

---

## 👨‍💻 Auteur

**Ernest OZKALE** - *Architecte Logiciel Passionné par la Gastronomie*
[GitHub](https://github.com/Ernest-OZKALE) | [LinkedIn](https://www.linkedin.com/in/ernest-ozkale/)

---
*Ce projet est une vitrine professionnelle soumise à un audit rigoureux de sécurité et de qualité.*
