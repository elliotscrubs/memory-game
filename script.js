const cards = document.querySelectorAll('.memory-card');
let hasFlipped = false;
let lockCard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockCard || this === firstCard) {
    return;
  }

  this.classList.add('flip');

  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  let isMatch = firstCard.dataset.work === secondCard.dataset.work;
  isMatch ? disableCards() : unFlipCards();
  displayFinishedPopup();
}

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
  if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
    setTimeout(() => {
      alert('You win!');
    }, 500);
  }
}

function resetGame() {
  hasFlipped = false;
  lockCard = false;
  firstCard = null;
  secondCard = null;
}

function mixCard() {
  cards.forEach(card => {
    let randomCard = Math.floor(Math.random() * cards.length);
    card.style.order = randomCard;
  });
}

mixCard();

cards.forEach(card => card.addEventListener('click', flipCard));