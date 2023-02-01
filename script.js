const cards = document.querySelectorAll('.memory-card');

let hasFlipped = false;
let lockCard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockCard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.work === secondCard.dataset.work;
  isMatch ? disableCards() : unFlipCards();

  displayFinishedPopup();

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetGame();
  }

  function unFlipCards() {
    lockCard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetGame();
    }, 1000);
  }

  function displayFinishedPopup() {
    if (document.querySelectorAll('.memory-card.flip').length == cards.length) {
        setTimeout(() => { 
            alert('You win!');
        }, 500)     
    }
  }
}

function resetGame() {
  [hasFlipped, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function mixCard() {
  cards.forEach(card => {
    document.querySelectorAll('.memory-card flip').length;
    let randomCard = Math.floor(Math.random() * 12);
    card.style.order = randomCard;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
