const appBody = document.getElementById("app-body");
const stage1 = document.getElementById("stage-1");
const stage2 = document.getElementById("stage-2");
const stage3 = document.getElementById("stage-3");

const bowWrapper = document.getElementById("bowWrapper");
const arrowGroup = document.getElementById("arrowGroup");
const mainHeart = document.getElementById("mainHeart");

let isFired = false;

// 1-RASMDAGI YURAKNI KICHIK YURAKCHALARDAN YASASH (Mathematical Heart Shape)
function buildCompositeHeart() {
  const container = document.getElementById("compositeInner");
  if (!container) return;

  const colors = [
    "#ff0054",
    "#ff2a6d",
    "#d90429",
    "#ef233c",
    "#ff4d6d",
    "#800f2f",
  ];

  // Katta yurak shakli formulasiga ko'ra ichini kichik yurakchalar bilan to'ldirish
  for (let i = 0; i < 220; i++) {
    // Heart equation: x = 16*sin^3(t), y = 13*cos(t)-5*cos(2t)-2*cos(3t)-cos(4t)
    const t = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()); // ichini bir xil va zich to'ldirish uchun

    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    x *= r * 7;
    y *= r * 7;

    const heart = document.createElement("div");
    heart.classList.add("sub-heart");

    // Yurak markaziga nisbatan joylashuvi
    heart.style.left = `${140 + x}px`;
    heart.style.top = `${130 + y}px`;

    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.background = color;
    heart.style.transform = `scale(${0.6 + Math.random() * 0.7}) rotate(${(Math.random() - 0.5) * 40}deg)`;

    container.appendChild(heart);
  }

  // Yurakning tepasiga sochilib uchib yurgan kichik barglar
  for (let i = 0; i < 35; i++) {
    const heart = document.createElement("div");
    heart.classList.add("sub-heart");

    const rx = (Math.random() - 0.5) * 180;
    const ry = -80 - Math.random() * 90;

    heart.style.left = `${140 + rx}px`;
    heart.style.top = `${130 + ry}px`;
    heart.style.background = colors[Math.floor(Math.random() * colors.length)];
    heart.style.transform = `scale(${0.3 + Math.random() * 0.5})`;
    heart.style.opacity = (0.4 + Math.random() * 0.6).toFixed(2);

    container.appendChild(heart);
  }
}

// 2-RASMDAGI DARAXT YAPROQLARI VA ERDAGI BARGLAR
function buildHeartTree() {
  const container = document.getElementById("treeLeaves");
  if (!container) return;

  const colors = [
    "#d90429",
    "#ff0054",
    "#ff4d6d",
    "#ff758f",
    "#ffb3c1",
    "#800f2f",
    "#a4133c",
  ];
  const heartD =
    "M 10,18 C 3,12 0,8 0,5 C 0,2 3,0 5,0 C 7,0 9,2 10,4 C 11,2 13,0 15,0 C 17,0 20,2 20,5 C 20,8 17,12 10,18 Z";

  // Daraxtning katta yurak shaklidagi shoxlari to'plami
  for (let i = 0; i < 350; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random());

    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    x = 200 + x * r * 9.5;
    y = 170 + y * r * 9.5;

    const scale = 0.5 + Math.random() * 0.8;
    const color = colors[Math.floor(Math.random() * colors.length)];

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", heartD);
    path.setAttribute("fill", color);
    path.setAttribute(
      "transform",
      `translate(${x}, ${y}) scale(${scale}) rotate(${(Math.random() - 0.5) * 60})`,
    );
    path.setAttribute("opacity", (0.75 + Math.random() * 0.25).toFixed(2));

    container.appendChild(path);
  }

  // Daraxt tagida to'kilib yotgan barglar
  for (let i = 0; i < 40; i++) {
    const x = 100 + Math.random() * 200;
    const y = 415 + Math.random() * 15;
    const scale = 0.4 + Math.random() * 0.5;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", heartD);
    path.setAttribute(
      "fill",
      colors[Math.floor(Math.random() * colors.length)],
    );
    path.setAttribute(
      "transform",
      `translate(${x}, ${y}) scale(${scale}) rotate(${Math.random() * 90})`,
    );

    container.appendChild(path);
  }
}

buildCompositeHeart();
buildHeartTree();

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
