const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const shuttle = new Image();
shuttle.src = "../images/spaceShuttle.png";

let shuttleX = 700;
let shuttleY = 1000;
const shuttleWidth = 100;
const shuttleHeight = 200;

let keys = {};
let bullets = [];
let rocks = [];
const numRocks = Math.round(Math.random() * 20);

generateRocks();

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;

  if(e.key === " ") {
    bullets.push({
          x: shuttleX + shuttleWidth / 2 - 2,
          y: shuttleY,
          speed: 4
    });
  }
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Checks for collision between two rectangles
function isColliding(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.width > b.x &&
    a.y < b.y + b.size &&
    a.y + a.height > b.y
  );
}

function displayRockCounter() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Rocks Remaining: ${rocks.length}`, 20, 30);
}

// Updates the position of the shuttle, bullets, and rocks
function update() {
  if (keys["w"]) shuttleY -= 2;
  if (keys["s"]) shuttleY += 2;
  if (keys["a"]) shuttleX -= 2;
  if (keys["d"]) shuttleX += 2;

  // Keep shuttle within canvas bounds
  shuttleX = Math.max(10, Math.min(canvas.width - shuttleWidth, shuttleX));
  shuttleY = Math.max(10, Math.min(canvas.height - shuttleHeight, shuttleY));

  // Move bullets up the screen
  for (let bullet of bullets) {
    bullet.y -= bullet.speed;
  }

  // Remove bullets that go off the screen
  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }

  // Move rocks down the screen
  for (let rock of rocks) {
    rock.y += rock.speed;

    if (rock.y > canvas.height) {
      rock.y = 0;
      rock.x = Math.random() * (canvas.width/2);
    }
  }

  // Check for collisions between bullets and rocks
  for (let i = rocks.length - 1; i >= 0; i--) {
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (
        isColliding(
          { x: bullets[j].x, y: bullets[j].y, width: 4, height: 10 },
          { x: rocks[i].x, y: rocks[i].y, size: rocks[i].size }
        )
      ) {
        rocks.splice(i, 1);
        bullets.splice(j, 1);
        if (rocks.length === 0) stopGame();
        break;
      }
    }
  }
}

//generates stars, shuttle, rocks and generates the bullets
// displays the rock counter
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  for (let i = 0; i < 50; i++) {
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 4, 4);
  }

  ctx.fillStyle = "blue";
  for (let rock of rocks) {
    ctx.fillRect(rock.x, rock.y, rock.size, rock.size);
  }

  ctx.drawImage(shuttle, shuttleX, shuttleY, shuttleWidth, shuttleHeight);

  ctx.fillStyle = "red";
  bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, bullet.y, 4, 10);
  });
  displayRockCounter();
}

function randomArea(min, max) {
  return Math.random() * (max - min) + min;
}

// Generates rocks at random positions
function generateRocks() {
  for (let i = 0; i < numRocks; i++) {
    rocks.push({
      x: randomArea(300, canvas.width-300),
      y: randomArea(10, canvas.height - 350),
      size: 50,
      speed: Math.random() * 0.8
    });
  }
}

// Updates the game state and renders the game
let running = true;
function gameLoop() {
  if (!running) {
    drawGameOver();
    return;
  }

  update();
  draw();

  requestAnimationFrame(gameLoop);
}

// Stops the game
function stopGame() {
  running = false;
  bullets = [];
}

// Draws the game over screen
function drawGameOver() {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 50);
}
gameLoop();