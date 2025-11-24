## Le jeu du "Memory"

### Objectif
Le but de ce projet est d'écrire un programme de jeu de **Memory**. Le Memory se joue avec des paires de carte ayant la même image. Au début du jeu, toutes les cartes sont retournées (face non visible), puis on choisit deux cartes, que l'on retourne successivement.  
Si les deux cartes ont la même image, on a trouvé une paire, et les 2 cartes restent face visible avec leur image.  
Si les 2 cartes choisies ne correspondent pas à la même image, les cartes restent visibles une fraction de seconde puis sont retournées (face non visible).  
Dans cette version *solo*, le but du jeu de Memory est de trouver toutes les paires d'images en un minimum de coups et/ou en un temps record.

### Données fournies
Les données retenues pour construire les faces et le dos des cartes peuvent être librement choisies :
  1. Soit les images données dans le répertoire "resources/images" de ce repository, 
  2. Soit les 'sprites' des Pokemons obtenus à partir de l'API https://pokeapi.co/api/v2/pokemon/,
  3. Soit des symboles obtenus à travers une police d'icônes comme "fontawesome" ou "glyphicon",
  4. ...

### Travail à réaliser
Développer le jeu qui devra s'exécuter dans un navigateur à l'aide du HTML, CSS et, bien entendu, du JavaScript.  
L'écriture du code doit valoriser une approche OO.

#### 1. La conception
Proposez des diagrammes UML : diagramme(s) des cas d'utilisation, diagramme(s) de séquence (de conception) et finallement le diagramme de classes.

#### 2. L'implémentation
L'implémentation devra être conforme à votre conception !  

La restitution visuelle et graphique peut se faire selon votre choix :
  - en HTML / CSS pur,
  - en s'appuyant sur l'objet HTML \<canvas\>
  - en utilisant une librairie graphique comme P5.js
  - ...


# memory_game
