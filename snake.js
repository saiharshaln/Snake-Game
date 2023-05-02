// Board
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

// Head of the Snake

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//Snake Speed
var speedX = 0;
var speedY = 0;

// Snake Body
var bodySnake = [];

// Points / Foods for Snake
var foodY;
var foodX;

var endGame = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  context = board.getContext("2d"); // Used to draw on the Board
  deployFood();
  document.addEventListener("keyup", directionChanger);
  setInterval(update, 1000 / 10);
};

function update() {
  if (endGame) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    bodySnake.push([foodX, foodY]);
    deployFood();
  }

  for (let i = bodySnake.length - 1; i > 0; i--) {
    bodySnake[i] = bodySnake[i - 1];
  }

  if (bodySnake.length) {
    bodySnake[0] = [snakeX, snakeY];
  }

  context.fillStyle = "yellow";
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < bodySnake.length; i++) {
    context.fillRect(bodySnake[i][0], bodySnake[i][1], blockSize, blockSize);
  }

  // Game Over Condition
  if (
    snakeX < 0 ||
    snakeX > columns * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    endGame = true;
    alert("Game Over");
    //update();
  }

  for (let i = 0; i < bodySnake.length; i++) {
    if (snakeX == bodySnake[i][0] && snakeY == bodySnake[i][1]) {
      endGame = true;
      alert("Game Over");
      //update();
    }
  }
}

// Randomizing Food Placement for the Snake
function deployFood() {
  foodX = Math.floor(Math.random() * columns) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Function for changing the direction

function directionChanger(e) {
  if (e.code == "ArrowUp" && speedY != 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.code == "ArrowDown" && speedY != -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.code == "ArrowLeft" && speedX != 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.code == "ArrowRight" && speedX != -1) {
    speedX = 1;
    speedY = 0;
  }
}
