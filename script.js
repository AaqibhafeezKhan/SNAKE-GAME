const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const aiBtn = document.getElementById('ai-btn');
const scoreDisplay = document.getElementById('score');
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let score = 0;
let direction = { x: 1, y: 0 };
let speed = 200;  // Game speed, lower is faster
let gameInterval;
let aiMode = false;

// Set up the grid size and scale
const gridSize = 20;
const tileSize = 15;
canvas.width = gridSize * tileSize;
canvas.height = gridSize * tileSize;

// Game Initialization
function startGame() {
    snake = [{ x: 10, y: 10 }];
    food = getRandomFood();
    score = 0;
    direction = { x: 1, y: 0 };
    clearInterval(gameInterval);
    speed = 200;
    gameInterval = setInterval(gameLoop, speed);
}

function gameLoop() {
    updateSnake();
    checkCollision();
    renderGame();
}

// AI Mode Toggle
aiBtn.addEventListener('click', () => {
    aiMode = !aiMode;
    aiBtn.textContent = aiMode ? 'Disable AI' : 'AI Mode';
});

// Snake Movement and Rendering
function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // If AI is enabled, find best direction (simple heuristic here)
    if (aiMode) {
        direction = findBestMove();
        head.x = snake[0].x + direction.x;
        head.y = snake[0].y + direction.y;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = getRandomFood();
        speed -= 5;  // Speed increases as the snake eats food
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, speed);
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || isSnakeCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over');
    }
}

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(part => {
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
    });

    // Draw food
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function getRandomFood() {
    return {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };
}

function isSnakeCollision(head) {
    return snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y);
}

function findBestMove() {
    // Basic AI to move towards food
    let bestMove = { x: 0, y: 0 };
    if (snake[0].x < food.x) bestMove.x = 1;
    else if (snake[0].x > food.x) bestMove.x = -1;

    if (snake[0].y < food.y) bestMove.y = 1;
    else if (snake[0].y > food.y) bestMove.y = -1;

    return bestMove;
}

// Event Listeners for starting the game
startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const keyPressed = event.key;
    if (keyPressed === 'ArrowUp' && direction.y !== 1) direction = { x: 0, y: -1 };
    else if (keyPressed === 'ArrowDown' && direction.y !== -1) direction = { x: 0, y: 1 };
    else if (keyPressed === 'ArrowLeft' && direction.x !== 1) direction = { x: -1, y: 0 };
    else if (keyPressed === 'ArrowRight' && direction.x !== -1) direction = { x: 1, y: 0 };
}
