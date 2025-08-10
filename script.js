const flower = document.getElementById("flowerContainer");
const glass = document.getElementById("glass");
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
  // Remove o vidro
  glass.style.opacity = "0";
  
  // Cresce a flor
  setTimeout(() => {
    flower.classList.add("grow");
  }, 500);

  // Some com a flor
  setTimeout(() => {
    flower.classList.add("fade-out");
  }, 2500);

  // Mostra tela do poema
  setTimeout(() => {
    flower.style.display = "none";
    poemScreen.classList.remove("hidden");
    typePoem(poem, poemText, () => {
      // Mostra mensagem final
      happyText.classList.remove("hidden");
      setTimeout(() => happyText.classList.add("show"), 200);
    });
  }, 4000);
});

// Função de digitação com pausas aleatórias
function typePoem(text, element, callback) {
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      let delay = 25 + Math.random() * 40; // velocidade base
      if (text.charAt(i) === "," || text.charAt(i) === "." || text.charAt(i) === "—") {
        delay += 150 + Math.random() * 150; // pausa em pontuação
      }
      i++;
      setTimeout(typeChar, delay);
    } else {
      if (callback) callback();
    }
  }
  typeChar();
}
