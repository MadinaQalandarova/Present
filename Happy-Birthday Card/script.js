const appBody = document.getElementById("app-body");
const stage1 = document.getElementById("stage-1");
const stage2 = document.getElementById("stage-2");
const stage3 = document.getElementById("stage-3");

const bowArea = document.getElementById("bowArea");
const arrowGroup = document.getElementById("arrowGroup");
const mainHeart = document.getElementById("mainHeart");

let isFired = false;

// Daraxt yaproqlarini hosil qilish
function buildHeartTree() {
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
  const heartPath =
    "M 12,21.35 C 5.4,15.36 2,12.28 2,8.5 C 2,5.42 4.42,3 7.5,3 C 9.24,3 10.91,3.81 12,5.09 C 13.09,3.81 14.76,3 16.5,3 C 19.58,3 22,5.42 22,8.5 C 22,12.28 18.6,15.36 12,21.35 Z";

  const clusters = [
    { cx: 150, cy: 100, r: 65 },
    { cx: 90, cy: 120, r: 50 },
    { cx: 210, cy: 115, r: 50 },
    { cx: 150, cy: 60, r: 45 },
    { cx: 60, cy: 135, r: 35 },
    { cx: 240, cy: 130, r: 35 },
  ];

  clusters.forEach((cluster) => {
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * cluster.r;
      const x = cluster.cx + Math.cos(angle) * dist - 12;
      const y = cluster.cy + Math.sin(angle) * dist - 12;

      const scale = 0.5 + Math.random() * 0.7;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", heartPath);
      path.setAttribute("fill", color);
      path.setAttribute("transform", `translate(${x}, ${y}) scale(${scale})`);
      path.setAttribute("opacity", (0.7 + Math.random() * 0.3).toFixed(2));

      container.appendChild(path);
    }
  });
}

buildHeartTree();

// O'q otilishi
bowArea.addEventListener("click", () => {
  if (isFired) return;
  isFired = true;

  // O'qning to'g'ri markazga uchishi
  arrowGroup.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
  arrowGroup.style.transform = "translate(35vw, -35vh)";

  setTimeout(() => {
    explodeMainHeart();

    setTimeout(() => {
      stage1.classList.remove("active");
      appBody.className = "bg-red";
      stage2.classList.add("active");

      setTimeout(() => {
        stage2.classList.remove("active");
        appBody.className = "bg-pink";
        stage3.classList.add("active");
      }, 5000);
    }, 500);
  }, 450);
});

function explodeMainHeart() {
  const rect = mainHeart.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  mainHeart.style.opacity = "0";

  for (let i = 0; i < 35; i++) {
    const particle = document.createElement("div");
    particle.classList.add("heart-particle");

    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 140 + Math.random() * 200;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${x}px, ${y}px) scale(${0.8 + Math.random() * 0.8})`;
      particle.style.opacity = "0";
    });

    setTimeout(() => {
      particle.remove();
    }, 850);
  }
}
const appBody = document.getElementById("app-body");
const stage1 = document.getElementById("stage-1");
const stage2 = document.getElementById("stage-2");
const stage3 = document.getElementById("stage-3");

const bowArea = document.getElementById("bowArea");
const arrowGroup = document.getElementById("arrowGroup");
const mainHeart = document.getElementById("mainHeart");

let isFired = false;

// Daraxt yaproqlarini hosil qilish
function buildHeartTree() {
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
  const heartPath =
    "M 12,21.35 C 5.4,15.36 2,12.28 2,8.5 C 2,5.42 4.42,3 7.5,3 C 9.24,3 10.91,3.81 12,5.09 C 13.09,3.81 14.76,3 16.5,3 C 19.58,3 22,5.42 22,8.5 C 22,12.28 18.6,15.36 12,21.35 Z";

  const clusters = [
    { cx: 150, cy: 100, r: 65 },
    { cx: 90, cy: 120, r: 50 },
    { cx: 210, cy: 115, r: 50 },
    { cx: 150, cy: 60, r: 45 },
    { cx: 60, cy: 135, r: 35 },
    { cx: 240, cy: 130, r: 35 },
  ];

  clusters.forEach((cluster) => {
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * cluster.r;
      const x = cluster.cx + Math.cos(angle) * dist - 12;
      const y = cluster.cy + Math.sin(angle) * dist - 12;

      const scale = 0.5 + Math.random() * 0.7;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", heartPath);
      path.setAttribute("fill", color);
      path.setAttribute("transform", `translate(${x}, ${y}) scale(${scale})`);
      path.setAttribute("opacity", (0.7 + Math.random() * 0.3).toFixed(2));

      container.appendChild(path);
    }
  });
}

buildHeartTree();

// O'q otilishi
bowArea.addEventListener("click", () => {
  if (isFired) return;
  isFired = true;

  // O'qning to'g'ri markazga uchishi
  arrowGroup.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
  arrowGroup.style.transform = "translate(35vw, -35vh)";

  setTimeout(() => {
    explodeMainHeart();

    setTimeout(() => {
      stage1.classList.remove("active");
      appBody.className = "bg-red";
      stage2.classList.add("active");

      setTimeout(() => {
        stage2.classList.remove("active");
        appBody.className = "bg-pink";
        stage3.classList.add("active");
      }, 5000);
    }, 500);
  }, 450);
});

function explodeMainHeart() {
  const rect = mainHeart.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  mainHeart.style.opacity = "0";

  for (let i = 0; i < 35; i++) {
    const particle = document.createElement("div");
    particle.classList.add("heart-particle");

    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 140 + Math.random() * 200;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${x}px, ${y}px) scale(${0.8 + Math.random() * 0.8})`;
      particle.style.opacity = "0";
    });

    setTimeout(() => {
      particle.remove();
    }, 850);
  }
}
