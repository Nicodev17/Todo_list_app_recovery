# Projet 8 du parcours développeur front-end d'OpenClassrooms - Reprenez et améliorez un projet existant

Brief du projet :

Vous venez d'intégrer une petite équipe qui souhaite aider les gens à s’organiser, c'est pourquoi ils ont créé une application de "To-Do List". L'idée elle-même est très bien mais le code derrière n'est pas au top ! Ils vous ont sollicité pour ajouter des tests et régler quelques bugs dans le code.

Il faut regarder comment ce code est structuré et essayer de comprendre comment il fonctionne. La mission sera de corriger des bugs, ajouter des tests, et optimiser sa performance.

Etape 1 : Corriger les bugs

Il y a deux bugs dans le code à trouver. Voici quelques indices:
Le premier est une faute de frappe.
Le deuxième introduit un conflit éventuel entre deux IDs identiques.
Il faut chercher ces bugs, une fois  trouvés, il faut les corriger ! Ils empêchent le code de marcher correctement (pour l'instant il n'est même pas possible d'ajouter des tâches à la liste à cause de ces bugs).
 
Il y a également des améliorations à faire, même s'il ne s'agit pas de bugs proprement dit. Il faut essayer de trouver où vous pouvez optimiser des boucles et vérifiez s'il y a des fonctions qui affichent des informations dans la console de débogage qui ne sont pas nécessaires (console.log).
 
 
Etape 2 : Ajouter des tests

Ce projet a déjà quelques tests mais largement pas assez ! Pour le prendre en main, il va falloir ajouter tous les tests unitaires et fonctionnels  pertinents que l’on peut. L'objectif est de solidifier le projet. Ainsi, lorsque nous le modifierons par la suite, on pourra se baser sur ces tests pour vérifier qu’on ne “casse” rien. (= fait gagner du temps par la suite)
Il est nécessaire d'utiliser la commande  npm install  pour installer tous les fichiers Jasmine.
Il y a déjà un fichier existant pour les tests de ce projet :
ControllerSpec.js .  À l'intérieur de ce fichier, quelques tests à ajouter sont indiqués dans le code. Ils sont indiqués avec le commentaire suivant :
// TODO: write test

Ils se trouvent sur les lignes #62, #86, #90, #137, #141, #146, #150, #156, et #196 de  ControllerSpec.js .
(possibilité d’aller plus loin et d’ajouter des tests complémentaires)
Astuce : gagnez du temps en adoptant la méthode TDD. Comme beaucoup de développeurs, si vous rédigez vos tests et corrigez des bugs en même temps, vous pouvez utiliser des tests pour identifier ce qui ne fonctionne pas - ce qui accélère la correction des bugs.

Etape 3 : Optimiser les performances (audit)

L’équipe vous a demandé d'analyser la performance d'un site concurrent pour identifier ce qui marche bien et ce qui ne marche pas, au cas où vous décidiez de "scaler" votre propre application. Voici le site du concurrent.
Utiliser la console de développement du navigateur pour analyser la performance du site. 
Faire attention aux ressources utilisées par les différents éléments du site (par exemple, ce qui est lent, ce qui est rapide, etc), aux ressources utilisées par les publicités sur le site ainsi que celles utilisées pour effectuer les fonctionnalités "To-do" pour la liste elle-même.
En s’appuyant sur ces données, il va falloir rédiger un audit de performances (document de 300 à 500 mots qui décrit la performance du site, comment il se distingue de notre application, et comment optimiser la performance en vue d'un éventuel "scaling" de l’application).

Etape 4 : Améliorer le projet

Maintenant que le code est assimilé, il va falloir ajouter des informations supplémentaires à la documentation.

Pour le dire plus simplement, il faut documenter les éléments suivants :
- Le projet lui-même (l'usage non technique)
- Comment il fonctionne techniquement
- Notre audit

On peut utiliser le format que l’on souhaite (ex. un wiki sur Github, un document en format texte, etc).

Livrables

- La base de code mise à jour avec les améliorations et les tests
- La documentation technique du projet, y compris notre audit, sous le format que l’on souhaite

