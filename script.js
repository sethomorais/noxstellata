const flower = document.getElementById("flowerContainer");
const glass = flower.querySelector(".glass");
const petals = flower.querySelector(".petals");
const leaves = flower.querySelector(".leaves");
const thorns = flower.querySelector(".thorns");
const poemScreen = document.getElementById("poemScreen");
const poemText = document.getElementById("poemText");
const happyText = document.getElementById("happyText");

// Poema com título e estrofes separadas em <p>
const poemHTML = `
  <p class="poem-title">Imperio en tus ojos</p>
  <p>En tus ojos veo mundos que no existen para nadie más,
     constelaciones atrapadas en abismos que me devoran sin piedad.
     Son portales… y cada vez que los miro,
     caigo más hondo, hasta olvidar quién soy.</p>

  <p>Tu manera es una conspiración silenciosa contra el resto del mundo,
     una danza rara cuyo ritmo sólo yo conozco.
     Y por eso, cada día planeo tu conquista como una guerra
     — no para encerrarte, sino para que nunca escapes de mí.</p>

  <p>Vos sos mi imperio, levantado sobre huesos y promesas,
     mi cetro, mi corona, mi capital de carne y alma.
     Aunque me esconda en las sombras,
     mi juramento sangra: siempre estoy acá.</p>

  <p>Lo que siento por vos no se mide en palabras<br>
     — es acero fundido en mi pecho,
     es veneno y cura en la misma dosis.</p>

  <p>Y si el mundo se atreve a tocarte,
     que sepa: mi amor también es una hoja afilada.
     Y por vos, la usaré.</p>
`;

// Função para "digitar" o texto poema com HTML (para poder usar tags)
function typePoemHTML(html, container, callback) {
  container.innerHTML = "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  let paragraphs = Array.from(tempDiv.children);
  let pIndex = 0;
  let charIndex = 0;

  function typeParagraph() {
    if (pIndex >= paragraphs.length) {
      if (callback) callback();
      return;
    }

    if (!container.children[pIndex]) {
      let p = document.createElement("p");
      if (paragraphs[pIndex].className)
        p.className = paragraphs[pIndex].className;
      container.appendChild(p);
    }

    let p = container.children[pIndex];
    let text = paragraphs[pIndex].innerHTML;

    // Substitui <br> por \n para digitação
    let pureText = text.replace(/<br\s*\/?>/gi, "\n");

    if (charIndex < pureText.length) {
      let nextChar = pureText.charAt(charIndex);
      if (nextChar === "\n") {
        p.innerHTML += "<br>";
      } else {
        p.innerHTML += nextChar;
      }
      charIndex++;
      let baseDelay = 20;
      let variance = 40;
      let delay = baseDelay + Math.random() * variance;
      if (nextChar === "\n") delay += 120;
      setTimeout(typeParagraph, delay);
    } else {
      pIndex++;
      charIndex = 0;
      setTimeout(typeParagraph, 400);
    }
  }

  typeParagraph();
}

flower.addEventListener("click", () => {
  // Desaparecer o vidro suavemente
  glass.style.opacity = "0";

  // Leve escala no jarro aberto
  flower.style.transition = "transform 1.5s ease";
  flower.style.transform = "translate(-50%, -50%) scale(1.05)";

  setTimeout(() => {
    // Esconder folhas e espinhos
    leaves.style.opacity = "0";
    thorns.style.opacity = "0";

    // Pétalas voando suavemente
    petals.classList.add("flying");
    [...petals.children].forEach((petal) => {
      const baseAngle = Math.random() * Math.PI * 2;
      const spread = Math.PI / 4;
      const angle = baseAngle + (Math.random() - 0.5) * spread;
      const dist = 500 + Math.random() * 200;
      const rotate = (Math.random() - 0.5) * 360;
      petal.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${rotate}deg)`;
      petal.style.opacity = "0";
    });

    // Desaparecer a flor toda
    flower.style.opacity = "0";

    // Mostrar o poema após voo das pétalas
    setTimeout(() => {
      poemScreen.classList.add("visible");
      typePoemHTML(poemHTML, poemText, () => {
        happyText.classList.add("show");
      });
    }, 3000);
  }, 1500);
});
