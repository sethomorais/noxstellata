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
  // Desaparece o vidro
  glass.style.opacity = "0";

  // Leve vibração para avisar que vai dispersar
  flower.style.animation = "shake 0.5s ease-in-out 3";

  // Depois da vibração, dispersa as pétalas
  setTimeout(() => {
    petals.classList.add("flying");
    leaves.style.opacity = "0";
    thorns.style.opacity = "0";

    // Aplica transformações aleatórias nas pétalas para voarem para bordas
    [...petals.children].forEach((petal) => {
      const angle = Math.random() * 2 * Math.PI; // direção aleatória
      const dist = 600 + Math.random() * 200; // distância pra fora da tela
      const rotate = (Math.random() - 0.5) * 720; // rotação aleatória até +/-360º duas vezes
      petal.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${rotate}deg)`;
      petal.style.opacity =
