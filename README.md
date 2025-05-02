# API de Contact pour mon portfolio

Cette application est une API Express Node.js de contact pour mon portfolio personnel. Elle permet aux utilisateurs d'envoyer des messages via un formulaire de contact, avec une vérification de langage inapproprié et l'envoi d'un email via Nodemailer.

## Fonctionnalités

- **Envoi de messages** : Les utilisateurs peuvent soumettre leur nom, email et message via une requête POST.
- **Filtrage de langage inapproprié** : Les messages contenant des mots inappropriés sont rejetés.
- **Envoi d'email** : Les messages valides sont envoyés par email à une adresse configurée.
- **Sécurisé avec dotenv** : Les informations sensibles (comme les identifiants email) sont stockées dans un fichier `.env`.

---

© 2025 Alban Lagragui