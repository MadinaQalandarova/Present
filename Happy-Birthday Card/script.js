const card = document.getElementById("card");
const gameStage = document.getElementById("game-stage");
const textStage = document.getElementById("text-stage");
const treeStage = document.getElementById("tree-stage");

const bowContainer = document.getElementById("bowContainer");
const arrowGroup = document.getElementById("arrowGroup");
const targetHeart = document.getElementById("targetHeart");

let isFired = false;

// Kamon ustiga bosilganda o'q otilishi
bowContainer.addEventListener("click", () => {
  if (isFired) return;
  isFired = true;

  // 1. O'qning yuqoriga - yurak tomon uchishi
  arrowGroup.style.transition = "transform 0.4s ease-in";
  arrowGroup.style.transform = "translate(120px, -220px)";

  setTimeout(() => {
    // 2. Yurakchani yo'q qilish va har tarafga sochish (Explosion)
    explodeHeart();

    setTimeout(() => {
      // 3. Birinchi bosqichni yashirish va FONI QIZILGA O'ZGARTIRISH
      gameStage.classList.add("hidden");
      card.classList.add("bg-red");
      textStage.classList.remove("hidden");

      // 4. 5 sekund davomida "HAPPY BIRTHDAY" ko'rinishi
      setTimeout(() => {
        // 5. Matn sahifasini yashirish va FONI PUSHTIGA O'ZGARTIRISH
        textStage.classList.add("hidden");
        card.classList.remove("bg-red");
        card.classList.add("bg-pink");

        // 6. Oxirgi bosqich: Yurakchali daraxt paydo bo'lishi
        treeStage.classList.remove("hidden");
      }, 5000); // Exact 5 seconds
    }, 400);
  }, 400);
});

// Yurak sochilib ketishi funksiyasi
function explodeHeart() {
  const rect = targetHeart.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const centerX = rect.left - cardRect.left + rect.width / 2;
  const centerY = rect.top - cardRect.top + rect.height / 2;

  targetHeart.style.opacity = "0";

  // 15 ta kichik yurakcha zarralarini hosil qilish
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;

    card.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 80;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${x}px, ${y}px) scale(${0.5 + Math.random()})`;
      particle.style.opacity = "0";
    });

    setTimeout(() => {
      particle.remove();
    }, 800);
  }
}
