export default class Card {

    constructor(id, imagePath) {
        this.id = id;
        this.imagePath = imagePath;
        this.isFlipped = false;
        this.isMatched = false;
        // Création de la card à l'initialisation
        this.element = this._createElement();
    }

    _createElement() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = this.id;

        card.innerHTML = `<div class="card-face card-back"><img src="images/blank.png" alt="Image retournée"></div>                                                                 
                            <div class="card-face card-front"><img src="${this.imagePath}" alt="Card Image"></div>`;
        return card;
    }

    // Ces méthodes modifient l'état interne de l'objet Card.
    flip() {
        this.isFlipped = true;
    }

    unflip() {
        this.isFlipped = false;
    }

    match() {
        this.isMatched = true;
    }
}