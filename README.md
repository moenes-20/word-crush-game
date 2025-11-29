# 🎮 Words Crush - Jeu Éducatif Multijoueur

Jeu de mots multijoueur en temps réel pour le cours de Management - Chapitre II: Les fonctions de l'entreprise.

## 🎯 Fonctionnalités

- ✅ Jeu multijoueur en temps réel
- ✅ Interface Joueur (mobile-first)
- ✅ Interface Administrateur (PC)
- ✅ QR Code pour connexion rapide
- ✅ Lobby avec compte à rebours
- ✅ Questions basées sur le Chapitre II
- ✅ Interaction tactile (clic sur les lettres)

## 🚀 Démarrage Rapide (Développement)

### Installation

```bash
# Installer les dépendances
npm install
cd client && npm install && cd ..

# Lancer l'application
npm run dev
```

### Accès

- **Joueurs**: http://localhost:5173
- **Admin**: http://localhost:5173/admin
- **Serveur**: http://localhost:3000

## 📦 Technologies

- **Frontend**: React, Vite, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express, Socket.io
- **Déploiement**: Vercel (frontend) + Railway/Render (backend)

## 📖 Documentation

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour le guide de déploiement complet.

## 🎓 Contenu Pédagogique

Le jeu couvre les fonctions de l'entreprise:
- Direction
- Approvisionnement
- Logistique
- Commerciale & Marketing
- Production
- Gestion de la qualité
- Finance/Comptabilité
- GRH
- R&D

## 👨‍💻 Développement

```bash
# Serveur uniquement
npm run server

# Client uniquement
npm run client

# Les deux en même temps
npm run dev
```

## 📝 License

Projet éducatif - Cours de Management
