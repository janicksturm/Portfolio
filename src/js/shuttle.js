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

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function update() {
  if (keys["w"]) shuttleY -= 2;
  if (keys["s"]) shuttleY += 2;
  if (keys["a"]) shuttleX -= 2;
  if (keys["d"]) shuttleX += 2;
  if(keys[" "]) {
    bullets.push({
          x: shuttleX + shuttleWidth / 2 - 2,
          y: shuttleY,
          speed: 4
    });
  }

  shuttleX = Math.max(10, Math.min(canvas.width - shuttleWidth, shuttleX));
  shuttleY = Math.max(10, Math.min(canvas.height - shuttleHeight, shuttleY));

  for (let bullet of bullets) {
    bullet.y -= bullet.speed;
  }

  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  for (let i = 0; i < 50; i++) {
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 4, 4);
  }

  ctx.drawImage(shuttle, shuttleX, shuttleY, shuttleWidth, shuttleHeight);

  ctx.fillStyle = "red";
  bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, bullet.y, 4, 10);
  });
}

function gameLoop() {
  update();
  draw();

  requestAnimationFrame(gameLoop);
}
gameLoop();