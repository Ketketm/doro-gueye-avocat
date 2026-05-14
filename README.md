# Cabinet d'avocats D.G — Maître Doro Gueye

Site officiel du Cabinet d'avocats D.G fondé en 2015 à Toulouse par Maître Doro Gueye, avocat à la Cour, docteur en droit.

## Domaines d'intervention

- Droit des étrangers
- Droit pénal
- Droit du travail
- Droit de la famille
- Droit des affaires
- Défense des victimes

## Stack

HTML statique, CSS, aucun framework. Polices Google (Cormorant Garamond + Inter). Déploiement sur Vercel.

## Structure

```
/
├── index.html                  # Accueil
├── cabinet.html                # Présentation du cabinet
├── actualites.html             # Articles juridiques
├── contact.html                # Coordonnées + formulaire
├── defense-des-victimes.html
├── mentions-legales.html
├── politique-confidentialite.html
├── plan-du-site.html
├── charte-graphique.html       # Identité visuelle (référence)
├── styles.css                  # Feuille de style partagée
├── favicon.svg + apple-touch-icon.png
│
├── droit-des-etrangers/        # 1 index + 7 sous-rubriques
├── droit-penal/                # 1 index + 3
├── droit-du-travail/           # 1 index + 2
├── droit-de-la-famille/        # 1 index + 3
├── droit-des-affaires/         # 1 index + 7
│
└── assets/
    └── images/
        ├── portrait-doro-robe.png        # Hero
        ├── portrait-doro-gueye.png       # Section salariés
        ├── cabinet-signature.png         # Section cabinet
        ├── poignee-de-main.png           # Section approche
        ├── bureau-employment.png         # Section travail
        ├── codes-juridiques.png          # Article LFSS
        └── logos/                        # 12 variantes (3 familles × 4 fonds)
```

## Développement local

```bash
# Serveur local rapide
python3 -m http.server 8000
# Ou
npx serve .
```

Ouvrir <http://localhost:8000>.

## Coordonnées

**Cabinet d'avocats D.G**
133, Boulevard Déodat de Sévérac
31300 Toulouse

Mobile : 06 24 14 61 14
Cabinet : 09 88 04 54 99
contact.avocat.dg@gmail.com

## Crédits

- Identité visuelle et site : [l'agence Nérée](https://www.nérée.com)
- Polices : Cormorant Garamond (SIL OFL) + Inter (SIL OFL)
- Hébergement : Vercel

© 2026 Cabinet d'avocats D.G. Tous droits réservés.
