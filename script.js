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

  <p>Lo que siento por vos no se mide en palabras
     — es acero fundido en mi pecho,
     es veneno y cura en la misma dosis.</p>

  <p>Y si el mundo se atreve a tocarte,
     que sepa: mi amor también es una hoja afilada.
     Y por vos, la usaré.</p>
`;

// Função para digitar o poema respeitando parágrafos (HTML)
function typePoemHTML(html, container, callback) {
  container.innerHTML = "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  let paragraphs = Array.from(tempDiv.children);
  let pIndex = 0;

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
    let htmlText = paragraphs[pIndex].innerHTML;
    let pureText = htmlText.replace(/<br\s*\/?>/gi, "\n");

    let charIndex = 0;

    function typeChar() {
      if (charIndex < pureText.length) {
        let nextChar = pureText.charAt(charIndex);
        if (nextChar === "\n") {
          p.innerHTML += "<br>";
        } else {
          let safeChar = nextChar
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
          p.innerHTML += safeChar;
        }
        charIndex++;
        let delay = 20 + Math.random() * 40;
        if (nextChar === "\n") delay += 100;
        setTimeout(typeChar, delay);
      } else {
        pIndex++;
        setTimeout(typeParagraph, 400);
      }
    }

    typeChar();
  }

  typeParagraph();
}

flower.addEventListener("click", () => {
  // Desaparecer vidro suavemente
  glass.style.opacity = "0";

  // Leve escala no jarro aberto
  flower.style.transition = "transform 1.5s ease";
  flower.style.transform = "translate(-50%, -50%) scale(1.05)";

  setTimeout(() => {
    leaves.style.opacity = "0";
    thorns.style.opacity = "0";

    petals.classList.add("flying");

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    [...petals.children].forEach((petal) => {
      const rect = petal.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      // Vetores para as bordas da viewport
      const vectors = [
        { x: startX - 0, y: startY - 0 },               // topo-esq
        { x: vw - startX, y: startY - 0 },              // topo-dir
        { x: vw - startX, y: vh - startY },             // baixo-dir
        { x: startX - 0, y: vh - startY },              // baixo-esq
      ];

      // Escolher o vetor mais distante (borda mais longe)
      let maxDist = 0;
      let bestVector = vectors[0];
      for (const v of vectors) {
        const dist = Math.hypot(v.x, v.y);
        if (dist > maxDist) {
          maxDist = dist;
          bestVector = v;
        }
      }

      // Ângulo para voar na direção da borda mais distante
      const angle = Math.atan2(bestVector.y, bestVector.x);

      // Distância aleatória entre 600 e 900 para sumir fora da tela
      const dist = 600 + Math.random() * 300;

      const translateX = Math.cos(angle) * dist;
      const translateY = Math.sin(angle) * dist;

      petal.style.transition = "transform 3s ease-in-out, opacity 3s ease-in-out";
      petal.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${(Math.random() - 0.5) * 360}deg)`;
      petal.style.opacity = "0";
    });

    flower.style.transition = "opacity 3s ease";
    flower.style.opacity = "0";

    setTimeout(() => {
      poemScreen.classList.add("visible");
      typePoemHTML(poemHTML, poemText, () => {
        happyText.classList.add("show");
      });
    }, 3000);
  }, 1500);
});
