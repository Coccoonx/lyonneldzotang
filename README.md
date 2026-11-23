# Lyonnel Dzotang Tchassen — Portfolio technique

Site portfolio personnel de **Lyonnel Dzotang Tchassen** (Senior IT Developer), présentant son profil, ses compétences, son expérience et ses projets.

## Lien d'accès public

- Site web public : **https://me.lyonneldzotang.com/**
- Version française : **https://me.lyonneldzotang.com/index.html**
- Version anglaise (Canada) : **https://me.lyonneldzotang.com/en-ca.html**

## Déploiement

Chaque push sur `main` redéploie le site (workflow `.github/workflows/deploy.yml`) : le VPS
met à jour son clone du dépôt et reconstruit le conteneur nginx (`Dockerfile`). Le workflow
se relance aussi à la main depuis l'onglet Actions (`workflow_dispatch`).

## Objectif du site

L'objectif du site est de proposer une vitrine professionnelle claire et accessible pour :
- présenter le parcours et les expertises techniques ;
- mettre en avant les réalisations et projets principaux ;
- faciliter la prise de contact professionnelle.

## Structure du site et principaux titres

Le site est organisé autour des sections principales suivantes :
- **Hero / Accueil** : introduction rapide, positionnement et accès direct aux projets ;
- **À propos de moi / About me** : présentation du profil, du parcours et du contexte professionnel ;
- **Compétences techniques / Technical skills** : compétences par domaines ;
- **Mon expérience / My experience** : expériences et rôles clés ;
- **Mes projets / My projects** : sélection de projets avec liens ;
- **Me contacter / Contact me** : canaux de contact et liens externes.

Le site propose une **navigation bilingue** :
- `index.html` pour le français ;
- `en-ca.html` pour l'anglais (Canada).

## Technologies utilisées (synthèse)

- **HTML5** pour la structure et le contenu des pages ;
- **CSS3** (`styles.css`) pour le design, la mise en page responsive et le thème visuel ;
- **JavaScript vanilla** (scripts intégrés aux pages) pour les interactions UI :
  - bascule de thème clair/sombre ;
  - gestion du menu mobile ;
  - activation des liens de navigation selon la section active.
