import GameLogic from "./GameLogic.js";
import GameView from "./GameView.js";

// 1. Récupération des éléments du DOM
const gameBoardElement = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const movesElement = document.getElementById("tour");

// 2. Données du jeu
const imagesFiles = [
    "lego1.png","lego2.png","lego3.png","lego4.png","lego5.png","lego6.png","lego7.png","lego8.png"
];

// 3. Initialisation des composants
const gameLogic = new GameLogic(imagesFiles);
const gameView = new GameView(gameBoardElement, scoreElement, movesElement, gameLogic);

// 4. Démarrage du jeu
gameLogic.startGame();
gameView.renderBoard();
