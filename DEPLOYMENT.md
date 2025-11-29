# Guide de Déploiement - Words Crush Game

## 📋 Prérequis

- Compte GitHub
- Compte Vercel (gratuit)
- Compte Railway/Render pour le serveur (gratuit)

## 🚀 Étapes de Déploiement

### 1. Préparer le Projet pour GitHub

```bash
cd "C:\Users\MSI\Desktop\TA1\gest_entr\Nouveau dossier\word-crush-game"
git init
git add .
git commit -m "Initial commit - Words Crush Game"
```

### 2. Créer un Repository sur GitHub

1. Allez sur https://github.com
2. Cliquez sur "New repository"
3. Nommez-le `word-crush-game`
4. Ne cochez PAS "Initialize with README"
5. Cliquez "Create repository"

### 3. Pousser le Code sur GitHub

```bash
git remote add origin https://github.com/VOTRE-USERNAME/word-crush-game.git
git branch -M main
git push -u origin main
```

### 4. Déployer le Serveur (Backend)

**Option A: Railway (Recommandé)**

1. Allez sur https://railway.app
2. Connectez-vous avec GitHub
3. Cliquez "New Project" → "Deploy from GitHub repo"
4. Sélectionnez `word-crush-game`
5. Dans les settings:
   - **Root Directory**: laissez vide
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Port**: Railway détectera automatiquement le port 3000
6. Notez l'URL de votre serveur (ex: `https://word-crush-game-production.up.railway.app`)

**Option B: Render**

1. Allez sur https://render.com
2. Cliquez "New" → "Web Service"
3. Connectez votre repository GitHub
4. Configuration:
   - **Name**: word-crush-server
   - **Root Directory**: laissez vide
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Plan**: Free
5. Notez l'URL de votre serveur

### 5. Déployer le Frontend sur Vercel

1. Allez sur https://vercel.com
2. Connectez-vous avec GitHub
3. Cliquez "Add New" → "Project"
4. Importez `word-crush-game`
5. Configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. **Variables d'environnement** (IMPORTANT):
   - Cliquez "Environment Variables"
   - Ajoutez: `VITE_SERVER_URL` = `https://VOTRE-URL-RAILWAY.up.railway.app`
   - (Remplacez par l'URL de votre serveur Railway/Render)
7. Cliquez "Deploy"

### 6. Configuration CORS du Serveur

Après le premier déploiement, vous devez mettre à jour le serveur pour accepter les requêtes de Vercel:

1. Ouvrez `server/index.js`
2. Modifiez la configuration CORS:

```javascript
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://VOTRE-APP.vercel.app"  // Ajoutez votre URL Vercel
        ],
        methods: ["GET", "POST"]
    }
});
```

3. Committez et poussez:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Railway/Render redéploiera automatiquement.

### 7. Tester l'Application

1. Ouvrez l'URL Vercel de votre application
2. Testez la connexion
3. Ouvrez `/admin` pour l'interface administrateur
4. Scannez le QR code avec votre téléphone

## 🔧 Mise à Jour de l'Application

Pour mettre à jour l'application après des modifications:

```bash
git add .
git commit -m "Description de vos modifications"
git push
```

- **Vercel** redéploiera automatiquement le frontend
- **Railway/Render** redéploiera automatiquement le backend

## 📱 URLs Finales

- **Frontend (Joueurs)**: `https://votre-app.vercel.app`
- **Admin**: `https://votre-app.vercel.app/admin`
- **Backend**: `https://votre-serveur.railway.app` (ou Render)

## ⚠️ Notes Importantes

1. **QR Code**: Le QR code généré utilisera automatiquement l'URL Vercel
2. **Mobile**: Les joueurs doivent être sur le même réseau WiFi OU utiliser l'URL Vercel
3. **Gratuit**: Les plans gratuits de Vercel et Railway sont suffisants pour un usage éducatif
4. **Limites**: 
   - Railway Free: 500 heures/mois
   - Vercel Free: Illimité pour les projets personnels

## 🆘 Dépannage

### Le serveur ne se connecte pas
- Vérifiez que `VITE_SERVER_URL` est correctement configuré dans Vercel
- Vérifiez que le serveur est bien déployé sur Railway/Render

### CORS Error
- Ajoutez l'URL Vercel dans la configuration CORS du serveur

### Le QR code ne fonctionne pas
- Assurez-vous d'utiliser l'URL Vercel (pas localhost)
- Le téléphone doit avoir accès à Internet
