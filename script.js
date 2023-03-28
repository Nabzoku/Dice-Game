'use strict';
//Variables
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const current1 = document.querySelector('#current--1');
const current2 = document.querySelector('#current--2');
const score1 = document.querySelector('#score--1');
const score2 = document.querySelector('#score--2');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const dicePic = document.querySelector('.dice');
let activeScore = Number(
  document.querySelector('.player--active .score').textContent
);
//Calling Active Player Function
const activePlayer = function () {
  return document.querySelector('.player--active .name').textContent;
};
//Calling Active Current Function
const activeCurrent = function () {
  return Number(
    document.querySelector('.player--active .current-score').textContent
  );
};

//Returning Score Function
const returnScore = function () {
  document.querySelector('.player--active .score').textContent = activeScore;
};

//Returning Score to Current Function
const returnCurrent = function () {
  document.querySelector('.player--active .current-score').textContent =
    activeCurrent() + activeScore;
};

//Changing Active Player Function
const changeActivePlayer = function () {
  if (player1.classList.contains('player--active')) {
    activeScore = 0;
    returnScore();
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  } else {
    activeScore = 0;
    returnScore();
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
  }
};

//Roll Dice Button Function
document.querySelector('.btn--roll').addEventListener('click', function () {
  const dice = Math.floor(Math.random() * 6) + 1;
  document.querySelector('.dice').src = `dice-${dice}.png`;

  if (dicePic.classList.contains('hidden')) dicePic.classList.remove('hidden');

  if (dice === 1) {
    changeActivePlayer();
  } else {
    activeScore += dice;
    returnScore();
  }
});

//Hold Button Function
document.querySelector('.btn--hold').addEventListener('click', function () {
  returnCurrent();
  if (activeCurrent() >= 100) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.querySelector('.winners-name').textContent = activePlayer();
    document.querySelector('.winners-score').textContent = activeCurrent();
  }
  changeActivePlayer();
});

//New Game Button Function
document.querySelectorAll('.btn--new').forEach((button) =>
  button.addEventListener('click', function () {
    if (!dicePic.classList.contains('hidden')) dicePic.classList.add('hidden');

    if (player2.classList.contains('player--active')) {
      player2.classList.remove('player--active');
      player1.classList.add('player--active');
    }
    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    }
    score1.textContent = score2.textContent = 0;
    current1.textContent = current2.textContent = 0;
    activeScore = 0;
  })
);
