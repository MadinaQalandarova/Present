const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

// Tezlikni boshqarish uchun o'zgaruvchilar
let initialSpeed = 160; // Boshlang'ich sekin tezlik (milli-soniyada)
let gameSpeed = initialSpeed;
let gameTimeout = null;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
  moveSnake();
  if (checkGameOver()) {
    alert(`O'yin tugadi! Sizning ballingiz: ${score}`);
    resetGame();
    return;
  }
  clearCanvas();
  drawFood();
  drawSnake();

  // Keyingi kadrni yangi tezlik bo'yicha rejalashtirish
  gameTimeout = setTimeout(gameLoop, gameSpeed);
}

function clearCanvas() {
  ctx.fillStyle = "#111322";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? "#ff007f" : "#00ffcc";
    ctx.shadowBlur = 10;
    ctx.shadowColor = index === 0 ? "#ff007f" : "#00ffcc";
    ctx.fillRect(
      part.x * gridSize,
      part.y * gridSize,
      gridSize - 2,
      gridSize - 2,
    );
  });
}

function drawFood() {
  ctx.fillStyle = "#ffe600";
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#ffe600";
  ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize - 2,
  );
}

function moveSnake() {
  if (dx === 0 && dy === 0) return;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").textContent = score;

    // 🚀 DARAJA VA TEZLIKNI OSHIRISH (Har 10 ochkoda)
    updateSpeed();

    generateFood();
  } else {
    snake.pop();
  }
}

function updateSpeed() {
  // Har 10 ochko uchun tezlik 15ms ga oshadi (minimal 40ms gacha)
  let level = Math.floor(score / 10);
  gameSpeed = Math.max(40, initialSpeed - level * 15);
}

function generateFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function checkGameOver() {
  if (dx === 0 && dy === 0) return false;

  const head = snake[0];

  // Devorga urilish
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true;
  }

  // O'ziga urilish
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function changeDirection(event) {
  const key = event.key.toLowerCase();

  if ((key === "arrowleft" || key === "a") && dx === 0) {
    dx = -1;
    dy = 0;
  } else if ((key === "arrowup" || key === "w") && dy === 0) {
    dx = 0;
    dy = -1;
  } else if ((key === "arrowright" || key === "d") && dx === 0) {
    dx = 1;
    dy = 0;
  } else if ((key === "arrowdown" || key === "s") && dy === 0) {
    dx = 0;
    dy = 1;
  }
}

function resetGame() {
  clearTimeout(gameTimeout);
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  score = 0;
  gameSpeed = initialSpeed; // Tezlikni asl holiga qaytarish
  document.getElementById("score").textContent = score;
  generateFood();
  gameLoop();
}

// O'yinni birinchi marta ishga tushirish
gameLoop();
