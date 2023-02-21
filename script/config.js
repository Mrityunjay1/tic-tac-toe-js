function openPlayerConfig(event) {
  editPlayer = +event.target.dataset.playerid;
  playerConfigOverlay.style.display = "block";
  backDrop.style.display = "block";
}

function closePlayer() {
  playerConfigOverlay.style.display = "none";
  backDrop.style.display = "none";
  erroMsg.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim();
  if (!enteredPlayerName) {
    erroMsg.textContent = "Please enter a valid name";
    erroMsg.style.color = "red";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
  players[editPlayer - 1].name = enteredPlayerName;

  closePlayer();
}

function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  gameOver.firstElementChild.innerHTML =
    '<h3>You Won!<span id="winner-name">Player Name</span></h3>';
  gameOver.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardElement = gameBoard.children[gameBoardIndex];
      gameBoardElement.textContent = "";
      gameBoardElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  gameIsOver = false;
  if (players[0] === "" || players[1].name === "") {
    alert("Please set your Names");
    return;
  }
  resetGame();
  gameArea.style.display = "block";
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[i][0];
    }
  }
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    return;
  }
  const selectedColumn = event.target.dataset.col - 1;
  const selectedRow = event.target.dataset.row - 1;
  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("please select an empty box");
    return;
  }
  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }
  currentRound++;
  switchPlayer();
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOver.style.display = "block";
  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOver.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOver.firstElementChild.textContent = "It is a Draw";
  }
}
