const flower = document.getElementById("flowerContainer");
const glass = document.getElementById("glass");
const petals = flower.querySelector(".petals");
const leaves = flower.querySelector(".leaves");
const thorns = flower.querySelector(".thorns");
const poemScreen = document.getElementById("poemScreen");
const poemText = document.getElementById("poemText");
const happyText = document.getElementById("happyText");

const poem = `Imperio en tus ojos

En tus ojos veo mundos que no existen para nadie más,
          constelaciones atrapadas en abismos que me devoran sin piedad.
          Son portales… y cada vez que los miro,          caigo más hondo, hasta olvidar quién soy.

          Tu manera es una conspiración silenciosa contra el resto del mundo,
          una danza rara cuyo ritmo sólo yo conozco.          Y por eso, cada día planeo tu conquista como una guerra          — no para encerrarte, sino para que nunca escapes de mí.

          Vos sos mi imperio, levantado sobre huesos y promesas,          mi cetro, mi corona, mi capital de carne y alma.          Aunque me esconda en las sombras,
          mi juramento sangra: siempre estoy acá.

          Lo que siento por vos no se mide en palabras
          — es acero fundido en mi pecho,          es veneno y cura en la misma dosis.

          Y si el mundo se atreve a tocarte,
          que sepa: mi amor también es una hoja afilada.
          Y por vos, la usaré.`;

flower.addEventListener("click", () => {
  // Desaparece o vidro suave
  glass.style.transition = "opacity 1.5s ease";
  glass.style.opacity = "0";

  // Vibe leve de abertura (como "abrir o jarro")
  flower.style.transition = "transform 1.5s ease";
  flower.style.transform = "translate(-50%, -50%) scale(1.05)";

  // Após "abrir", dispersa as pétalas
  setTimeout(() => {
    petals.classList.add("flying");
    leaves.style.opacity = "0";
    thorns.style.opacity = "0";

    // Pétalas voando estilo vento suave
    [...petals.children].forEach((petal) => {
      const baseAngle = Math.random() * Math.PI * 2;
      const spread = Math.PI / 4; // espalhamento +- 45 graus do ângulo base
      const angle = baseAngle + (Math.random() - 0.5) * spread;
      const dist = 500 + Math.random() * 200;
      const rotate = (Math.random() - 0.5) * 360;
      petal.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${rotate}deg)`;
      petal.style.opacity = '0';
    });

    // O jarro desaparece suavemente
    flower.style.transition = "opacity 3s ease";
    flower.style.opacity = '0';

    // Mostra poema após 3s de voo
    setTimeout(() => {
      poemScreen.classList.add('visible');
      typePoem(poem, poemText, () => {
        happyText.classList.add('show'); // Aparece só depois do poema
      });
    }, 3000);
  }, 1500);
});

// Digitação mais rápida com pausas humanas
function typePoem(text, element, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      let baseDelay = 20; // mais rápido
      let variance = 40; // menor variação para parecer natural
      let delay = baseDelay + Math.random() * variance;
      if (text.charAt(i - 1) === '\n') delay += 120; // pausa maior em nova linha
      setTimeout(type, delay);
    } else {
      if (callback) callback();
    }
  }
  element.textContent = '';
  type();
}
