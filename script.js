const flower = document.getElementById("flowerContainer");
const glass = document.getElementById("glass");
const petals = flower.querySelector(".petals");
const leaves = flower.querySelector(".leaves");
const thorns = flower.querySelector(".thorns");
const poemScreen = document.getElementById("poemScreen");
const poemTitle = document.getElementById("poemTitle");
const poemText = document.getElementById("poemText");
const happyText = document.getElementById("happyText");

const poem = `En tus ojos veo mundos que no existen para nadie más,
constelaciones atrapadas en abismos que me devoran sin piedad.
Son portales… y cada vez que los miro, caigo más hondo, hasta olvidar quién soy.

Tu manera es una conspiración silenciosa contra el resto del mundo,
una danza rara cuyo ritmo sólo yo conozco. Y por eso, cada día planeo tu conquista como una guerra — no para encerrarte, sino para que nunca escapes de mí.

Vos sos mi imperio, levantado sobre huesos y promesas, mi cetro, mi corona, mi capital de carne y alma. Aunque me esconda en las sombras,
mi juramento sangra: siempre estoy acá.

Lo que siento por vos no se mide en palabras — es acero fundido en mi pecho, es veneno y cura en la misma dosis.

Y si el mundo se atreve a tocarte, que sepa: mi amor también es una hoja afilada.
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

      // Distância a voar
      const distance = 300 + Math.random() * 150;

      // Calcula os deslocamentos em X e Y
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      petal.style.transform = `translate(${x}px, ${y}px) rotate(${(Math.random() - 0.5) * 360}deg)`;
      petal.style.opacity = "0";
    });

    // Após a dispersão, esconde a flor e mostra o poema
    setTimeout(() => {
      flower.style.opacity = "0";
      showPoem();
    }, 4000);
  }, 1600);
});

// Função pra digitar texto letra a letra com ritmo humano fluido
function typeText(text, element, delayMin = 15, delayMax = 60, callback) {
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;

      // Pausas aleatórias pra parecer humano
      let delay = delayMin + Math.random() * (delayMax - delayMin);
      if (text.charAt(i - 1) === ',' || text.charAt(i - 1) === '.') {
        delay += 120;
      }
      if (text.charAt(i - 1) === '—') {
        delay += 200;
      }

      setTimeout(type, delay);
    } else if (callback) {
      callback();
    }
  }

  type();
}

function showPoem() {
  poemScreen.classList.add("visible");
  poemTitle.textContent = "";
  poemText.textContent = "";
  happyText.classList.remove("show");

  // Digitar título primeiro
  typeText(title, poemTitle, 40, 70, () => {
    poemTitle.textContent += "\n"; // pulinho pra separar visualmente

    // Depois digitar o corpo do poema
    typeText(poemBody, poemText, 10, 40, () => {
      happyText.classList.add("show");
    });
  });
}
