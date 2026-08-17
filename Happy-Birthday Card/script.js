const appBody = document.getElementById("app-body");
const stage1 = document.getElementById("stage-1");
const stage2 = document.getElementById("stage-2");
const stage3 = document.getElementById("stage-3");

const bowWrapper = document.getElementById("bowWrapper");
const arrowGroup = document.getElementById("arrowGroup");
const mainHeart = document.getElementById("mainHeart");

let isFired = false;

// TEPADAN YURAKCHALAR TUSHIB IDEAL YURAK SHAKLINI HOSIL QILISH
function animateFallingHeartAssembly() {
  const container = document.getElementById("assemblyContainer");
  if (!container) return;

  container.innerHTML = "";

  const colors = [
    "#ff0054",
    "#ff2a6d",
    "#d90429",
    "#ef233c",
    "#ff4d6d",
    "#800f2f",
  ];
  const totalHearts = 220;

  // Maydon o'lchamiga nisbatan markazni hisoblash
  const rect = container.getBoundingClientRect();
  const centerX = (rect.width || 260) / 2;
  const centerY = (rect.height || 260) / 2;
  const scaleFactor = (rect.width || 260) / 32;

  for (let i = 0; i < totalHearts; i++) {
    const t = Math.random() * Math.PI * 2;
    // Tashqi chegara va ichki qatlamlarni ideal taqsimlash
    const r = i < 80 ? 1 : Math.sqrt(Math.random());

    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    const targetX = centerX + x * r * (scaleFactor * 0.45) - 10;
    const targetY = centerY + y * r * (scaleFactor * 0.45) - 10;

    // Boshlang'ich joylashuv (Tepadan tushishi uchun)
    const startX = targetX + (Math.random() - 0.5) * 250;
    const startY = -250 - Math.random() * 300;

    const heart = document.createElement("div");
    heart.classList.add("falling-heart");
    heart.style.background = colors[Math.floor(Math.random() * colors.length)];

    heart.style.transform = `translate(${startX}px, ${startY}px) scale(0.4) rotate(${Math.random() * 360}deg)`;
    container.appendChild(heart);

    const delay = i * 10;
    setTimeout(() => {
      heart.style.opacity = "1";
      heart.style.transform = `translate(${targetX}px, ${targetY}px) scale(${0.55 + Math.random() * 0.4}) rotate(${(Math.random() - 0.5) * 25}deg)`;
    }, delay);
  }
}

// O'lcham o'zgarganda qayta hisoblash uchun
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(animateFallingHeartAssembly, 100);
});

// KAMONDAN O'Q OTILISHI
bowWrapper.addEventListener("click", () => {
  if (isFired) return;
  isFired = true;

  arrowGroup.style.transition =
    "transform 0.45s cubic-bezier(0.2, 0.8, 0.4, 1)";
  arrowGroup.style.transform = "translate(35vw, -35vh)";

  setTimeout(() => {
    explodeHeart();

    setTimeout(() => {
      stage1.classList.remove("active");
      appBody.className = "bg-red";
      stage2.classList.add("active");

      setTimeout(() => {
        stage2.classList.remove("active");
        appBody.className = "bg-pink";
        stage3.classList.add("active");
      }, 5000);
    }, 450);
  }, 400);
});

// PORTLASH EFFEKTI
function explodeHeart() {
  const rect = mainHeart.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  mainHeart.style.opacity = "0";

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.innerHTML = `
      <svg viewBox="0 0 20 20" width="100%" height="100%">
        <path d="M 10,18 C 3,12 0,8 0,5 C 0,2 3,0 5,0 C 7,0 9,2 10,4 C 11,2 13,0 15,0 C 17,0 20,2 20,5 C 20,8 17,12 10,18 Z" fill="#ff4d6d"/>
      </svg>
    `;

    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 140 + Math.random() * 200;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${x}px, ${y}px) scale(${0.7 + Math.random() * 0.8})`;
      particle.style.opacity = "0";
    });

    setTimeout(() => {
      particle.remove();
    }, 850);
  }
}
