const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const snake = [{ x: 200, y: 200 }];
let dx = 20, dy = 0;
let food = { x: getRandomCoord(), y: getRandomCoord() };
let obstacles = generateObstacles(5);
let score = 0;
let highScore = 0;
let gameOver = false;
let speed = 100; // Initial speed in ms

document.addEventListener('keydown', changeDirection);
document.getElementById('restartBtn').addEventListener('click', restartGame);

function main() {
  if (gameOver) return;
  setTimeout(() => {
    clearCanvas();
    drawFood();
    drawObstacles();
    advanceSnake();
    drawSnake();
    checkCollision();
    main();
  }, speed);
}

function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(part => {
    ctx.fillStyle = 'green';
    ctx.fillRect(part.x, part.y, 20, 20);
  });
}

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    speed -= 5; // Increase speed as snake eats food
    document.getElementById('score').textContent = score;
    food = { x: getRandomCoord(), y: getRandomCoord() };
    obstacles = generateObstacles(5); // Regenerate obstacles
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const goingUp = dy === -20;
  const goingDown = dy === 20;
  const goingRight = dx === 20;
  const goingLeft = dx === -20;

  if (keyPressed === 37 && !goingRight) { dx = -20; dy = 0; }
  if (keyPressed === 38 && !goingDown) { dx = 0; dy = -20; }
  if (keyPressed === 39 && !goingLeft) { dx = 20; dy = 0; }
  if (keyPressed === 40 && !goingUp) { dx = 0; dy = 20; }
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 20, 20);
}

function getRandomCoord() {
  return Math.floor(Math.random() * 20) * 20;
}

function generateObstacles(count) {
  const obstacles = [];
  for (let i = 0; i < count; i++) {
    let obstacle;
    do {
      obstacle = { x: getRandomCoord(), y: getRandomCoord() };
    } while (isInSnake(obstacle) || (obstacle.x === food.x && obstacle.y === food.y));
    obstacles.push(obstacle);
  }
  return obstacles;
}

function drawObstacles() {
  ctx.fillStyle = 'orange';
  obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, 20, 20));
}

function isInSnake(part) {
  return snake.some(segment => segment.x === part.x && segment.y === part.y);
}

function checkCollision() {
  const head = snake[0];

  // Wall collision
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    endGame();
  }

  // Self-collision
  for (let i = 4; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
    }
  }

  // Obstacle collision
  obstacles.forEach(obstacle => {
    if (head.x === obstacle.x && head.y === obstacle.y) {
      endGame();
    }
  });
}

function endGame() {
  gameOver = true;
  highScore = Math.max(score, highScore);
  document.getElementById('highScore').textContent = highScore;
  alert('Game Over!');
}

function restartGame() {
  score = 0;
  document.getElementById('score').textContent = score;
  snake.length = 1;
  snake[0] = { x: 200, y: 200 };
  dx = 20;
  dy = 0;
  food = { x: getRandomCoord(), y: getRandomCoord() };
  obstacles = generateObstacles(5);
  gameOver = false;
  speed = 100;
  main();
}

// Start the game
main();
