const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;
const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];
const playerConfigOverlay = document.getElementById("config-overlay");
const backDrop = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const startNewGameBtn = document.getElementById("start-game-btn");
const gameArea = document.getElementById("active-game");
const gameFieldElements = document.querySelectorAll("#game-board li");
const gameBoard = document.getElementById("game-board");
const activePlayerName = document.getElementById("active-player-name");
const gameOver = document.getElementById("game-over");
const erroMsg = document.querySelector("#config-errors");
const cancelButton = document.getElementById("cancel-button");
const winnerName = document.getElementById("winner-name");
const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);
cancelButton.addEventListener("click", closePlayer);
backDrop.addEventListener("click", closePlayer);

formElement.addEventListener("submit", savePlayerConfig);
startNewGameBtn.addEventListener("click", startNewGame);
for (const gameFieldElement of gameFieldElements) {
  gameFieldElement.addEventListener("click", selectGameField);
}
