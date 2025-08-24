# 📁 Dossier Public - Intégration du CV

Ce dossier contient les fichiers statiques de votre projet Next.js, y compris votre CV.

## 🎯 Comment intégrer votre CV

### Option 1: Image JPEG/PNG (Recommandée)
1. **Copiez votre fichier CV** dans ce dossier (`public/`)
2. **Renommez-le** en `cv-preview.jpg` (ou modifiez le chemin dans `app/about/page.tsx`)
3. **Formats supportés** : JPG, PNG, WebP

### Option 2: PDF
Si vous préférez utiliser un PDF, modifiez le composant dans `app/about/page.tsx` :
- Remplacez la balise `<img>` par un `<iframe>` ou `<object>`
- Ou utilisez une bibliothèque comme `react-pdf`

### Option 3: Lien externe
Vous pouvez aussi pointer vers une URL externe en modifiant le `src` dans le composant.

## 📋 Structure recommandée
```
public/
├── cv-preview.jpg     # Votre CV principal
├── cv-complet.pdf     # Version téléchargeable
└── README.md          # Ce fichier
```

## 🔧 Personnalisation
- **Taille** : Modifiez `w-64 h-80` dans le composant
- **Effet de flou** : Ajustez `blur(8px)` dans le style
- **Animations** : Personnalisez les paramètres GSAP

Votre CV sera automatiquement affiché avec l'effet de révélation au survol et au clic !
