"use strict";
//*Selektovanje elemenata
//* Okvir elementa
let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");
//*Gornji score
let diceScore1 = document.getElementById("score--0");
let diceScore2 = document.getElementById("score--1");
//*Trenutni donji score
let current0 = document.getElementById("current--0");
let current1 = document.getElementById("current--1");
//*Buttoni
let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");

//* Pocetne vrednosti
let score, currentScore, activePlayer, playing;
let diceImage = document.querySelector(".dice");
const initial = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0.textContent = 0;
  current1.textContent = 0;
  diceScore1.textContent = 0;
  diceScore2.textContent = 0;

  diceImage.classList.remove("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
initial();

diceImage.classList.add("hidden");

//*funkcija prebacivanja igraca
let playerSwitch = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//* funkcija bacanja kockice
btnRoll.addEventListener("click", function () {
  if (playing) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNumber);
    diceImage.classList.remove("hidden");
    diceImage.src = `dice-${randomNumber}.png`;
    //*Svaki put posle klika 'roll'
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      playerSwitch();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      diceImage.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      playerSwitch();
    }
  }
});

btnNew.addEventListener("click", initial);
