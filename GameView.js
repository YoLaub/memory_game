//VIEW DU JEU
export default class GameView {
    constructor(boardElement, scoreElement, movesElement, gameLogic) {
        this.boardElement = boardElement;
        this.scoreElement = scoreElement;
        this.movesElement = movesElement;
        this.logic = gameLogic;

        //Map key/Value
        this.cardElements = new Map();

        this._bindLogicEvents();
    }

    // Connection des callbacks de la logique aux méthode de la vue
    _bindLogicEvents() {
        // Cette méthode est le pont entre la logique du jeu et l'interface utilisateur.
        // Elle remplace les fonctions vides de la logique (`on...`) par de vraies
        // instructions qui manipulent le DOM et l'affichage.

        // QUAND la logique dit que le score a changé...
        // ... ALORS exécute ma fonction `updateScore` avec la nouvelle valeur.
        this.logic.onScoreUpdate = (score) => this.updateScore(score);

        // QUAND la logique dit que le nombre de tours a changé...
        // ... ALORS exécute ma fonction `updateMoves` avec la nouvelle valeur.
        this.logic.onMoveUpdate = (moves) => this.updateMoves(moves);

        // QUAND la logique signale un "match" (une paire trouvée)...
        // Elle nous fournit les deux cartes gagnantes (`card1`, `card2`).
        this.logic.onMatch = (card1, card2) => {
            this.cardElements.get(card1.id).classList.add('matched');
            this.cardElements.get(card2.id).classList.add('matched');
        };

        // QUAND la logique signale qu'il n'y a PAS de match...
        // Elle nous fournit quand même les deux cartes retournées (`card1`, `card2`).
        this.logic.onNoMatch = (card1, card2) => {
            setTimeout(() => {
                this.cardElements.get(card1.id).classList.remove('flipped');
                this.cardElements.get(card2.id).classList.remove('flipped');
                this.logic.resetTurnAfterNoMatch();
            }, 1000);
        };

        // QUAND la logique signale que la partie est terminée..
        this.logic.onGameOver = (score, moves) => {
            setTimeout(() => {
                alert(`Bravo! Your score is ${score} and you made ${moves} moves.`);
            }, 500);
        };
    }

    //Rendu de la grille de cartes
    renderBoard() {
        this.boardElement.innerHTML = '';
        this.cardElements.clear();

        this.logic.cards.forEach(card => {
            const cardElement = card.element;

            this.cardElements.set(card.id, cardElement);

            cardElement.addEventListener('click', () => {
                const wasActionTaken = this.logic.selectCard(card);
                if (wasActionTaken) {
                    cardElement.classList.add('flipped');
                }
            });

            this.boardElement.appendChild(cardElement);
        });

        this.updateScore(this.logic.score);
        this.updateMoves(this.logic.moves);
    }

    //Maj du score et des moves
    updateScore(score) {
        this.scoreElement.textContent = score;
    }

    updateMoves(moves) {
        this.movesElement.textContent = moves;
    }
}