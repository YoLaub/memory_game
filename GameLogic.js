import Card from "./Card.js";

//LOGIQUE DU JEU
export default class GameLogic {
    constructor(imageFiles) {
        this.imageFiles = imageFiles;
        this.cards = [];
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.lockBoard = false;
        this.score = 0;
        this.moves = 0;

        // Callbacks pour communiquer avec la vue, sans la connaître directement
        this.onMoveUpdate = () => {};
        this.onScoreUpdate = () => {};
        this.onMatch = () => {};
        this.onNoMatch = () => {};
        this.onGameOver = () => {};
    }

    startGame() {
        this.score = 0;
        this.moves = 0;
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.lockBoard = false;
        this.createCards();
        this.shuffleCards();
    }

    createCards() {
        this.cards = [];
        this.imageFiles.forEach((fileName, index) => {
            const imagePath = `images/${fileName}`;
            this.cards.push(new Card(`card-${index}-a`, imagePath));
            this.cards.push(new Card(`card-${index}-b`, imagePath));
        });
    }

    shuffleCards() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    // Gestion de la sélection d'une carte. Cette méthode est appelée par la Vue à chaque clic.
    // Elle renvoie `true` si le clic est valide et a provoqué une action
    selectCard(card) {
        // C'est une "clause de garde" : on vérifie d'abord si le jeu autorise une action.
        // Si le plateau est verrouillé (lockBoard), ou si la carte est déjà trouvée (isMatched)
        // ou si on clique sur une carte déjà retournée (isFlipped, empêche de cliquer 2x sur la même carte),
        // alors on ne fait rien et on sort de la fonction.
        if (this.lockBoard || card.isMatched || card.isFlipped) {
            return false;
        }

        // Si le clic est valide, on met à jour l'état de l'objet Card.
        // Note : ceci ne modifie que la donnée en mémoire, pas l'affichage.
        card.flip();

        // C'est ici que l'on gère la logique du tour.
        // Est-ce la première carte du tour ? On le sait si `this.firstCardClicked` est `null`.
        if (!this.firstCardClicked) {
            this.firstCardClicked = card;
            return true;
        }

        this.secondCardClicked = card;
        this.lockBoard = true;

        this._checkForMatch();
        return true;
    }

    _checkForMatch() {
        const isMatch = this.firstCardClicked.imagePath === this.secondCardClicked.imagePath;
        isMatch ? this._handleMatch() : this._handleNoMatch();
    }

    _handleMatch() {
        this.firstCardClicked.match();
        this.secondCardClicked.match();

        this.score++;
        this.onScoreUpdate(this.score);

        // Notifier la vue qu'il y a eu un match
        this.onMatch(this.firstCardClicked, this.secondCardClicked);

        const allMatched = this.cards.every(card => card.isMatched);
        if (allMatched) {
            this.onGameOver(this.score, this.moves);
        }

        this._resetTurn();
    }


    _handleNoMatch() {
        // Notifier la vue qu'il n'y a pas eu de match
        this.onNoMatch(this.firstCardClicked, this.secondCardClicked);
    }

    // La vue appelle cette méthode après l'animation unflip
    resetTurnAfterNoMatch() {
        if (this.firstCardClicked) this.firstCardClicked.unflip();
        if (this.secondCardClicked) this.secondCardClicked.unflip();
        this._resetTurn();
    }

    _resetTurn() {
        [this.firstCardClicked, this.secondCardClicked] = [null, null];
        this.moves++;
        this.lockBoard = false;
        this.onMoveUpdate(this.moves);
    }
}