# Fall Challenge 2020

Bot à l'attention du "Fall Challenge 2020" de Codingame réalisé en javascript.

Je conseille d'installer les extensions suivantes :
- [Extension de Codingame](https://chrome.google.com/webstore/detail/codingame-sync-ext/ldjnbdgcceengbjkalemckffhaajkehd/related)
- [App de Codingame](https://chrome.google.com/webstore/detail/codingame-sync-app/nmdombhgnofjnnaenegcdehnbkajfgbh/related)

Pour setup l'environnement de travail en local il faut :
- Installer les extensions ci-dessus
- Aller sur [Codingame](https://www.codingame.com/ide/challenge/fall-challenge-2020)
- Aller dans paramètres
- Descendre tout en bas
- Mettre `Utiliser un éditeur de code externe` à `ON`
- Ecouter le fichier `dist/bundle.js` avec l'app de Codingame
- Lancer la commande `npm start`

Maintenant Lorsque vous modifiez un des fichiers dans `src/**/*`, Codingame reçoit la dernière version de votre build.

Autrement vous pouvez aussi lancer la commande `npm run codingame`.
Vous aurez dans votre presse papier la dernière version de votre application.
Vous pouvez maintenant coller la nouvelle version dans l'éditeur de Codingame

Usefull emojis for commit messages : 🧪🧱⚙️🚀💡📝🧽🔥

## Todos

- Ajouter une méthode au joueur `scoreOf` qui permet de calculer le score en fonction de son inventaire.
- Ajouter une méthode au joueur `scoreOfSpellFor` qui permet de calculer le score du spell en fonction de son inventaire et de la recette.
- Améliorer le calcul du score des actions en comptant le temps de repos
- Coder le processus pour déterminer l'action à réaliser

## Processus de résolution

- je boucle sur les recettes
    - je calcule les ingrédients qu'il reste à obtenir en fonction de l'inventaire du joueur
    - je stocke le score des recettes en fonction de l'inventaire du joueur
    - s'il n'y a pas d'ingrédient manquant je sélectionne la commande BREW
    - je boucle sur les sorts du joueur
        - je stocke le score des sorts en fonction des ingrédients qu'il reste à obtenir pour la recette et de l'inventaire du joueur
    - je boucle sur les sorts à apprendre
        - je stocke le score des sorts en fonction des ingrédients qu'il reste à obtenir pour la recette et de l'inventaire du joueur
    - je sélectionne le sort qui a le meilleur score pour les recettes
- je sélectionne l'action final à effectuer en fonction du score des recettes et de l'action à mettre en place 
