# IHR 2021 

Auteurs
- Olivier Pautrat
- Jonathan Guichard

# Deploy to pepper

In the directory **tablet**

`npm run build_to_deploy`

# Use 

On Pepper 4, move to app `ihr-jgd-opt`

Run `python app.py`


# Storyboard


1. Pepper: Bonjour humain, je m'appelle Pepper, comment vous vous appelez ?
2. Humain: Bonjour Pepper, je m'appelle X
3. Pepper: D'accord X, que voulez-vous comme boisson parmi A, B, C, D
4. Humain: J'aimerai A s'il te plait
5. Pepper: Bien compris, j'ai envoyé la commande, le temps de l'attente je vais te raconter une blague: BLAGUE
6. Pepper: On m'annonce que votre commande est prête, je vais la chercher (mouvement précodé)
7. Pepper: J'ai récupéré votre commande, je reviens
8. Voici votre commande, bonne dégustation, appuyé sur ma tête pour faire une autre commande


# Le serveur de blague est dans le dossier backend

Il s'agit d'une petite API REST en python récupérant les blagues depuis [https://blagues.xyz](https://blagues.xyz). Ce serveur est actuellement hebergé sur un VPS externe afin que la tablette puisse y accéder

Il permet aussi de logguer toutes les sorties de la console JavaScript (console.log, console.error) dans un fichier de log