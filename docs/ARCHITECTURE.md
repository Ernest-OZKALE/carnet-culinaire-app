# 🏛️ Vision Architecturale - Carnet Culinaire Élite

## Introduction
Ce document détaille les choix techniques et architecturaux qui font de ce projet une vitrine de niveau 'Élite'. L'objectif est de démontrer une capacité à concevoir des systèmes robustes, scalables et centrés sur l'expérience utilisateur.

## 1. Choix du Stack Technologique

### Supabase vs Firebase
Bien que le projet ait débuté sur Firebase, la migration vers **Supabase** a été motivée par :
- **Relationnel SQL** : Le modèle de données culinaires (Critiques <-> Plats <-> Établissements) bénéficie énormément de la puissance de PostgreSQL pour les jointures et les agrégations.
- **Sécurité RLS** : Les *Row Level Security* de Supabase offrent une couche de sécurité granulaire et transparente, directement au niveau de la base de données.
- **Vector Search** : Ouverture vers la recherche sémantique pour le "Radar à Pépites" (future implémentation).

### Vercel
Le choix de **Vercel** pour l'hébergement garantit :
- Des performances de chargement optimales grâce aux calculs à la "Edge".
- Une intégration CI/CD fluide, essentielle pour une maintenance professionnelle.

## 2. Architecture Monorepo
La structure monorepo (`/apps`, `/docs`, `/infrastructure`, `/scripts`) permet de :
- Centraliser toute la logique projet (Code + Documentation + Infra).
- Faciliter la réutilisation de composants ou de types entre différents services (Client Web, Admin, Edge Functions).

## 3. Module IA : "Expert Mode" (Palais Raffiné)
L'analyse culinaire ne se limite pas à une note sur 5. Le module **Palais Raffiné** utilise une logique de décomposition sensorielle :
- **Texture & Cuisson**
- **Équilibre des Saveurs**
- **Présentation & Créativité**
- **Sourcing & Saisonnalité**

Ces données sont structurées en JSONB dans Supabase, permettant une analyse évolutive sans modifier le schéma de la base.

---
*Ce document est une preuve de réflexion architecturale profonde, visant l'excellence opérationnelle.*
