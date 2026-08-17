const appBody = document.getElementById("app-body");
const stage1 = document.getElementById("stage-1");
const stage2 = document.getElementById("stage-2");
const stage3 = document.getElementById("stage-3");

const bowArea = document.getElementById("bowArea");
const arrowGroup = document.getElementById("arrowGroup");
const mainHeart = document.getElementById("mainHeart");

let isFired = false;

// Kamonga bosilganda harakat boshlanadi
bowArea.addEventListener("click", () => {
  if (isFired) return;
  isFired = true;

  // 1. O'q markazga uchib boradi
  arrowGroup.style.transition = "transform 0.4s ease-in";
  arrowGroup.style.transform = "translate(250px, -350px)";

  setTimeout(() => {
    // 2. Markazdagi yurak har tarafga sochilib ketadi
    explodeMainHeart();

    setTimeout(() => {
      // 3. 1-bosqich yo'qolib, 2-bosqich boshlanadi (Fon: Qizil)
      stage1.classList.remove("active");
      appBody.className = "bg-red";
      stage2.classList.add("active");

      // 4. 2-bosqich roppa-rosa 5 sekund turadi
      setTimeout(() => {
        // 5. 2-bosqich yo'qolib, 3-bosqich boshlanadi (Fon: Pushti)
        stage2.classList.remove("active");
        appBody.className = "bg-pink";
        stage3.classList.add("active");
      }, 5000); // 5 sekundilikk taymer
    }, 500);
  }, 400);
});

// Yurakni mayda parchalarga bo'lib sochish funksiyasi
function explodeMainHeart() {
  const rect = mainHeart.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  mainHeart.style.opacity = "0";

  for (let i = 0; i < 24; i++) {
    const particle = document.createElement("div");
    particle.classList.add("heart-particle");

    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${x}px, ${y}px) scale(${0.6 + Math.random()})`;
      particle.style.opacity = "0";
    });

    setTimeout(() => {
      particle.remove();
    }, 800);
  }
}
