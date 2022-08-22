const cards = document.querySelectorAll('.memory-card');

let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip")

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        
        checkforMatch();
    }
}

function checkforMatch() {
    if (firstCard.dataset.band === secondCard.dataset.band) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");    

        resetBoard();
    }, 500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click", flipCard))