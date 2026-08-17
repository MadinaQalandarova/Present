const appBody = document.getElementById("app-body");
const stage1 = document.getElementById("stage-1");
const stage2 = document.getElementById("stage-2");
const stage3 = document.getElementById("stage-3");

const bowWrapper = document.getElementById("bowWrapper");
const arrowGroup = document.getElementById("arrowGroup");
const mainHeart = document.getElementById("mainHeart");

let isFired = false;

// Daraxt yaproqlarini yaratish
function generateTreeLeaves() {
  const container = document.getElementById("treeLeaves");
  if (!container) return;

  const colors = [
    "#ff4d6d",
    "#ff758f",
    "#ff8fa3",
    "#c9184a",
    "#ffb3c1",
    "#800f2f",
  ];
  const heartD =
    "M 10,18 C 3,12 0,8 0,5 C 0,2 3,0 5,0 C 7,0 9,2 10,4 C 11,2 13,0 15,0 C 17,0 20,2 20,5 C 20,8 17,12 10,18 Z";

  const clusters = [
    { cx: 150, cy: 90, r: 55 },
    { cx: 95, cy: 110, r: 45 },
    { cx: 205, cy: 105, r: 45 },
    { cx: 150, cy: 55, r: 40 },
    { cx: 65, cy: 125, r: 30 },
    { cx: 235, cy: 120, r: 30 },
  ];

  clusters.forEach((cluster) => {
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * cluster.r;
      const x = cluster.cx + Math.cos(angle) * dist - 10;
      const y = cluster.cy + Math.sin(angle) * dist - 10;

      const scale = 0.6 + Math.random() * 0.7;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", heartD);
      path.setAttribute("fill", color);
      path.setAttribute("transform", `translate(${x}, ${y}) scale(${scale})`);
      path.setAttribute("opacity", (0.75 + Math.random() * 0.25).toFixed(2));

      container.appendChild(path);
    }
  });
}

generateTreeLeaves();

// Kamon bosilganda otilish mantig'i
bowWrapper.addEventListener("click", () => {
  if (isFired) return;
  isFired = true;

  // O'qning markazdagi yurakka uchishi
  arrowGroup.style.transition =
    "transform 0.45s cubic-bezier(0.2, 0.8, 0.4, 1)";
  arrowGroup.style.transform = "translate(35vw, -35vh)";

  setTimeout(() => {
    explodeHeart();

    setTimeout(() => {
      // 1-bosqich yopilib, foni QIZILGA o'tadi
      stage1.classList.remove("active");
      appBody.className = "bg-red";
      stage2.classList.add("active");

      // 5 sekunddan keyin 3-bosqichga o'tadi
      setTimeout(() => {
        stage2.classList.remove("active");
        appBody.className = "bg-pink";
        stage3.classList.add("active");
      }, 5000);
    }, 450);
  }, 400);
});

// Portlash effekti
function explodeHeart() {
  const rect = mainHeart.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  mainHeart.style.opacity = "0";

  for (let i = 0; i < 35; i++) {
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
    const distance = 120 + Math.random() * 180;

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
