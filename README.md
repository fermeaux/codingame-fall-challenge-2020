# Fall Challenge 2020

## Résultat

Cette résolution du problème s'est classé :
- 840 / 7.034 participants classés
- 289 / 1.927 de la ligue argent
- 29 / 594 dans le langage javascript

## Développer

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

## Algorithme

L'algorithme final est une implémentation de BFS (Algorithme de parcours en largeur) qui permet d'obtenir un objectif le plus rapidement possible.
cf [Wikipedia](https://fr.wikipedia.org/wiki/Algorithme_de_parcours_en_largeur)

Ici notre objectif est d'objectif est d'obtenir une recette le plus rapidement possible.
Malheureusement, durant la compétition, je me suis retrouvé bloqué face au manque de performance du javascript.
Mon code ne parcourt que 4 noeuds de profondeur.
Ceux qui travaillaient avec les technos C++ parcouraient 8 noeuds au minimum.
Donc il arrivait souvent que mon code ne trouve pas d'objectif.
J'ai dû m'adapté et trouvé des moyens de rendre mon code plus performant.
Mais aussi calculer un score peu couteux pour déterminer la meilleure branche.
Je me suis donc inspiré de mon algo maison du début du challenge qui se base uniquement sur un raisonnement mathématique peu fiable.
Mais cela suffit à aiguiller mon code pour trouver des recettes à faire.
Au delà de ça, j'ai tweeké en dur mon code :
- Pour qu'il n'accepte que les recettes au dessus de 13 points
- Pour l'obliger à apprendre les 6 premiers tours.
Effectivement, en ayant observé le haut du classement, j'ai remarqué ce pattern prédominant.

## Conclusion

J'ai passé une super semaine qui m'a tenu en haleine.
De plus, je n'étais pas seul à participer.
J'avais un ami à mes côtés pour partager autour du sujet et s'élever mutuellement.
Ca fait du bien de se focus sur des problèmes algorithmiques car dans notre quotidien de développeur web, il est rare d'en rencontrer.
Avec du recule, pour le prochain challenge, il y a deux possibilités.
Soit je code en Javascript comme maintenant, soit je change de langage pour avoir plus de performance.
Le problème du javascript sont ses performances.
Mais dans ce cas mon prochain objectif sera d'être premier de ceux qui code en javascript.
Dans le cas où je décide de changer de langage, je me poserai la question suivante :
Est ce que je joue dans la cour des grands ou j'en profite pour apprendre un nouveau langage.
Dans le premier cas, il est clair que je partirai sur C++.
C'est simple 90% des légendes font du C++.
Dans le second cas, deux langages me semblent prometteurs : Golang et Rust.
Mais j'ai ma petite préférence pour Golang.
Ca sera probablement mon orientation pour le prochain contest.
Mon objectif sera de faire Gold en Golang.