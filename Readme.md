# Jeu de Memory en JavaScript

Ce projet est une implémentation en JavaScript pur (Vanilla JS) du jeu de Memory classique. L'accent a été mis sur une architecture logicielle propre et découplée, séparant la logique du jeu de sa représentation visuelle.

## Architecture & Conception

Le projet est structuré autour d'un patron de conception qui sépare clairement les responsabilités (Separation of Concerns), s'inspirant du patron Modèle-Vue.

### 1. La Logique (Le "Modèle") - `GameLogic.js`

Le fichier `GameLogic.js` est le cerveau de l'application. Il contient toute la logique du jeu et gère l'état de la partie (les cartes, le score, les tours, les cartes sélectionnées).

*   **Indépendance du DOM** : Ce module n'a aucune connaissance du HTML ou du CSS. Il ne manipule jamais le DOM directement.
*   **Communication par Callbacks** : Pour notifier l'interface utilisateur des changements d'état, `GameLogic.js` utilise un système de callbacks (ex: `onScoreUpdate`, `onMatch`, `onGameOver`). La Vue "s'abonne" à ces événements pour mettre à jour l'affichage.
*   **Gestion de l'état** : Il est le seul responsable de la modification de l'état des objets `Card` (retournée, trouvée, etc.).

### 2. La Vue (La "View") - `GameView.js`

Le fichier `GameView.js` est responsable de tout ce qui concerne l'affichage et l'interaction avec l'utilisateur.

*   **Manipulation du DOM** : Sa seule responsabilité est de traduire l'état fourni par `GameLogic` en éléments HTML visibles et interactifs. Il crée les cartes, met à jour le score et gère les classes CSS pour les animations (ex: `.flipped`, `.matched`).
*   **Liaison des Événements** : Dans sa méthode `_bindLogicEvents()`, la vue connecte les callbacks de la logique à ses propres méthodes de mise à jour du DOM.
*   **Capture des entrées utilisateur** : Il écoute les clics sur les cartes (`addEventListener`) et délègue le traitement de ces actions à la logique via la méthode `this.logic.selectCard(card)`.

### 3. Le Modèle de Donnée - `Card.js`

La classe `Card.js` est un modèle de données simple qui représente une seule carte. Elle contient ses propriétés (`id`, `imagePath`) et son état interne (`isFlipped`, `isMatched`). Elle est également responsable de la création de son propre élément HTML de base (`_createElement()`), rendant chaque objet carte autonome.

### 4. Le Point d'Entrée - `index.js`

Ce fichier est l'orchestrateur. Il a un rôle simple mais crucial :
1.  Récupérer les éléments du DOM.
2.  Instancier `GameLogic`.
3.  Instancier `GameView` en lui injectant la logique (`gameLogic`).
4.  Démarrer la partie.

Cette architecture garantit que la logique du jeu pourrait être réutilisée avec une interface complètement différente (par exemple, en `<canvas>`, en console, ou avec un framework comme React/Vue) sans avoir à modifier une seule ligne de `GameLogic.js`.

## Structure des Fichiers

```
.                                                                                                                                                                                   
├── UML/                                                                                                                                                                            
│   ├── Diagramme_class.puml     # Diagramme de classes de l'architecture                                                                                                           
│   └── Diagramme_Sequence.puml  # Séquence d'un tour de jeu                                                                                                                        
│   └── USeCase.puml             # Cas d'utilisation                                                                                                                                
├── Card.js                      # Classe représentant une carte                                                                                                                    
├── GameLogic.js                 # Cœur du jeu : règles, état, score                                                                                                                
├── GameView.js                  # Gestion de l'affichage et des interactions DOM                                                                                                   
├── index.html                   # Structure HTML de la page                                                                                                                        
├── index.js                     # Point d'entrée : initialisation et orchestration                                                                                                 
├── style.css                    # Styles et animations des cartes                                                                                                                  
└── Readme.md                    # Ce fichier                                                                                                                                       
```                                                                                                                                                                                 
                                                                                                                                                                                    
## Technologies Utilisées                                                                                                                                                           
                                                                                                                                                                                    
*   **HTML5**                                                                                                                                                                       
*   **CSS3** (Flexbox, Grid, animations `transform`)                                                                                                                                
*   **JavaScript (ES6)** : Utilisation des modules (`import`/`export`) et des classes.                                                                                              
*   **PlantUML** : Pour la modélisation des diagrammes de conception situés dans le dossier `UML/`.                                                                                 
                                                                                                                                                                                    
## Comment Lancer le Projet                                                                                                                                                         
                                                                                                                                                                                    
Aucune dépendance ou étape de compilation n'est nécessaire.                                                                                                                         
                                                                                                                                                                                    
1.  Clonez ou téléchargez ce dépôt.                                                                                                                                                 
2.  Ouvrez le fichier `index.html` directement dans un navigateur web moderne.                                                                                                      
                                                                                                                                                                                    
Pour une expérience optimale et pour éviter tout problème potentiel de CORS lié au chargement des modules JavaScript (`type="module"`), il est recommandé de servir les fichiers via un serveur local simple.                                                                                                                                                           
                                                                                                                                                                          