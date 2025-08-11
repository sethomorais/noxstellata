const flower = document.getElementById("flowerContainer");
const glass = document.getElementById("glass");
const petals = flower.querySelector(".petals");
const leaves = flower.querySelector(".leaves");
const thorns = flower.querySelector(".thorns");
const poemScreen = document.getElementById("poemScreen");
const poemText = document.getElementById("poemText");
const happyText = document.getElementById("happyText");

const poemTitle = "Imperio en tus ojos";
const poemBody = `

En tus ojos veo mundos que no existen para nadie más,
constelaciones atrapadas en abismos que me devoran sin piedad.
Son portales… y cada vez que los miro, caigo más hondo, hasta olvidar quién soy.

Tu manera es una conspiración silenciosa contra el resto del mundo,
una danza rara cuyo ritmo sólo yo conozco.
Y por eso, cada día planeo tu conquista como una guerra —
no para encerrarte, sino para que nunca escapes de mí.

Vos sos mi imperio, levantado sobre huesos y promesas,
mi cetro, mi corona, mi capital de carne y alma.
Aunque me esconda en las sombras,
mi juramento sangra: siempre estoy acá.

Lo que siento por vos no se mide en palabras —
es acero fundido en mi pecho,
es veneno y cura en la misma dosis.

Y si el mundo se atreve a tocarte,
que sepa: mi amor también es una hoja afilada.
Y por vos, la usaré.`;

flower.addEventListener("click", () => {
  glass.style.transition = "opacity 1.5s ease";
  glass.style.opacity = "0";

  flower.style.transition = "transform 1.5s ease";
  flower.style.transform = "translate(-50%, -50%) scale(1.05)";

  setTimeout(() => {
    petals.classList.add("flying");
    leaves.style.opacity = "0";
    thorns.style.opacity = "0";

    [...petals.children].forEach((petal) => {
      const baseAngle = Math.random() * Math.PI * 2;
      const spread = Math.PI / 4;
      const angle = baseAngle + (Math.random() - 0.5) * spread;
      const dist = 500 + Math.random() * 200;
      const rotate = (Math.random() - 0.5) * 360;
      petal.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${rotate}deg)`;
      petal.style.opacity = "0";
    });

    flower.style.transition = "opacity 3s ease";
    flower.style.opacity = "0";

    setTimeout(() => {
      poemScreen.classList.add("visible");
      typePoem(poemTitle, poemBody, poemText, () => {
        happyText.classList.add("show");
      });
    }, 3000);
  }, 1500);
});

function typePoem(title, body, element, callback) {
  element.innerHTML = `<h1 class="poem-title">${title}</h1><p></p>`;
  const p = element.querySelector("p");
  let i = 0;

  function type() {
    if (i < body.length) {
      p.textContent += body.charAt(i);
      i++;
      let baseDelay = 20;
      let variance = 40;
      let delay = baseDelay + Math.random() * variance;
      if (body.charAt(i - 1) === "\n") delay += 120;
      setTimeout(type, delay);
    } else {
      if (callback) callback();
    }
  }
  type();
}
