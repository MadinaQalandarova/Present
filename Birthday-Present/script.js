const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const formContainer = document.getElementById("form-container");
const greetingForm = document.getElementById("greeting-form");
const nameInput = document.getElementById("name-input");

let width, height;
let letters = [];
let particles = [];
let splashParticles = [];
let animationStarted = false;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// -------------------------------------------------------------
// 1. BACKGROUND SPLASH CURSOR (Sizga yoqqan yorqin neon-binafsha ko'rinishi)
// -------------------------------------------------------------
class FluidParticle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx * 0.4 + (Math.random() - 0.5) * 2;
    this.vy = vy * 0.4 + (Math.random() - 0.5) * 2;
    this.radius = Math.random() * 12 + 6;
    this.alpha = 0.9;
    this.dissipation = 0.015;
    this.hue = 271 + (Math.random() - 0.5) * 20;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.94;
    this.vy *= 0.94;
    this.alpha -= this.dissipation;
    this.radius *= 0.97;
  }

  draw() {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = Math.max(0, this.alpha);

    let gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius * 2,
    );
    gradient.addColorStop(0, `hsl(${this.hue}, 90%, 70%)`);
    gradient.addColorStop(0.5, `hsl(${this.hue}, 80%, 50%)`);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

let lastMouseX = 0;
let lastMouseY = 0;

function handlePointerMove(x, y) {
  let vx = x - lastMouseX;
  let vy = y - lastMouseY;

  if (Math.hypot(vx, vy) > 1) {
    for (let i = 0; i < 4; i++) {
      splashParticles.push(new FluidParticle(x, y, vx, vy));
    }
  }
  lastMouseX = x;
  lastMouseY = y;
}

window.addEventListener("mousemove", (e) =>
  handlePointerMove(e.clientX, e.clientY),
);
window.addEventListener("touchmove", (e) => {
  if (e.touches.length > 0) {
    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }
});

// -------------------------------------------------------------
// 2. HARFLAR VA SHARLAR (Tebranishsiz, mukammal joylashuv)
// -------------------------------------------------------------
function Letter(char, x, y, delay) {
  this.char = char;
  this.targetX = x;
  this.targetY = y;

  // Boshlang'ich joylashuv
  this.x = width / 2 + (Math.random() - 0.5) * 200;
  this.y = height + 50;

  this.phase = "firework";
  this.delay = delay;
  this.timer = 0;

  this.hue = Math.random() * 360;
  this.color = `hsl(${this.hue}, 85%, 60%)`;

  // Sharlar uchishi uchun parametrlar
  this.balloonSpeedY = 1.2 + Math.random() * 2.2;
  this.balloonSpeedX = (Math.random() - 0.5) * 3;
  this.balloonWobble = Math.random() * 10;
  this.wobbleSpeed = 0.02 + Math.random() * 0.03;
  this.rotation = (Math.random() - 0.5) * 0.3;

  // Pulsatsiya (Neon yorug'lik) effekti uchun
  this.pulseAngle = Math.random() * Math.PI;
}

Letter.prototype.update = function () {
  if (this.timer < this.delay) {
    this.timer++;
    return;
  }

  if (this.phase === "firework") {
    this.x += (this.targetX - this.x) * 0.05;
    this.y += (this.targetY - this.y) * 0.05;

    if (Math.random() < 0.2) {
      particles.push(new Particle(this.x, this.y, this.hue));
    }

    if (Math.hypot(this.targetX - this.x, this.targetY - this.y) < 5) {
      this.x = this.targetX;
      this.y = this.targetY;
      this.phase = "stay";
      this.stayStartTime = Date.now();
    }
  } else if (this.phase === "stay") {
    // Harflar bir o'rinda qo'zg'almay duradi, faqat yorug'ligi mayin yonib-o'chadi
    this.pulseAngle += 0.03;

    if (Date.now() - this.stayStartTime > 5000) {
      // 5 sekund
      this.phase = "balloon";
    }
  } else if (this.phase === "balloon") {
    // Sharlar uchib ketadi
    this.balloonWobble += this.wobbleSpeed;
    this.x += this.balloonSpeedX + Math.sin(this.balloonWobble) * 2;
    this.y -= this.balloonSpeedY;
  }
};

Letter.prototype.draw = function () {
  if (this.timer < this.delay) return;

  ctx.save();
  if (this.phase === "balloon") {
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.sin(this.balloonWobble) * 0.15 + this.rotation);

    // Shar
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 27, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = `hsl(${this.hue}, 80%, 40%)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Tugun
    ctx.beginPath();
    ctx.moveTo(-4, 27);
    ctx.lineTo(4, 27);
    ctx.lineTo(0, 31);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    // Ip
    ctx.beginPath();
    ctx.moveTo(0, 31);
    ctx.quadraticCurveTo(Math.sin(this.balloonWobble * 2) * 12, 50, 0, 75);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Harf
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.char, 0, 0);
  } else {
    ctx.font = "bold 40px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Tebranmaydigan, mayin yonib-o'chuvchi neon glow
    let glowBlur = 12 + Math.sin(this.pulseAngle) * 6;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = glowBlur;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(this.char, this.x, this.y);
  }
  ctx.restore();
};

// -------------------------------------------------------------
// 3. SALYUT ZARRALARI (Sparks)
// -------------------------------------------------------------
function Particle(x, y, hue) {
  this.x = x;
  this.y = y;
  this.vx = (Math.random() - 0.5) * 4;
  this.vy = (Math.random() - 0.5) * 4;
  this.alpha = 1;
  this.color = `hsl(${hue}, 100%, 70%)`;
}

Particle.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;
  this.alpha -= 0.025;
};

Particle.prototype.draw = function () {
  ctx.save();
  ctx.globalAlpha = Math.max(0, this.alpha);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

// -------------------------------------------------------------
// 4. MAIN ANIMATION LOOP
// -------------------------------------------------------------
function createGreeting(name) {
  // 1-o'zgarish: Undov belgisi HAPPY BIRTHDAY'dan olindi va ISMning oxiriga qo'shildi
  const lines = ["HAPPY", "BIRTHDAY", `${name.toUpperCase()}!`];

  const fontSize = 40;
  const lineHeight = 65;
  const startY = height / 2 - (lines.length * lineHeight) / 2;

  let globalDelay = 0;

  lines.forEach((line, lineIdx) => {
    const y = startY + lineIdx * lineHeight;
    ctx.font = `bold ${fontSize}px Poppins, sans-serif`;
    const totalWidth = ctx.measureText(line).width;
    let startX = (width - totalWidth) / 2;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const charWidth = ctx.measureText(char).width;

      if (char !== " ") {
        letters.push(new Letter(char, startX + charWidth / 2, y, globalDelay));
        globalDelay += 3;
      }
      startX += charWidth;
    }
  });
}

function animate() {
  ctx.fillStyle = "#0b0b10";
  ctx.fillRect(0, 0, width, height);

  // Splash Cursor
  for (let i = splashParticles.length - 1; i >= 0; i--) {
    splashParticles[i].update();
    splashParticles[i].draw();
    if (splashParticles[i].alpha <= 0) {
      splashParticles.splice(i, 1);
    }
  }

  // Salyut zarralari
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  // Harf va Sharlar
  letters.forEach((letter) => {
    letter.update();
    letter.draw();
  });

  requestAnimationFrame(animate);
}

greetingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = nameInput.value.trim();
  if (userName) {
    formContainer.classList.add("hide");
    createGreeting(userName);
    if (!animationStarted) {
      animationStarted = true;
      animate();
    }
  }
});
