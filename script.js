const jarContainer = document.getElementById('jarContainer');
const petals = document.querySelector('.petals');
const petalDivs = document.querySelectorAll('.petals > div');
const poemScreen = document.getElementById('poemScreen');
const poemTextElem = document.getElementById('poemText');
const happyText = document.getElementById('happyText');

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

let isOpen = false;

jarContainer.addEventListener('click', () => {
  if (isOpen) return;
  isOpen = true;

  // faz jarro sumir suavemente
  jarContainer.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
  jarContainer.style.opacity = '0';
  jarContainer.style.transform = 'translate(-50%, -50%) scale(0.7)';

  // anima pétalas voando para bordas
  petals.classList.add('flying');
  petalDivs.forEach((petal, i) => {
    const angle = (i / petalDivs.length) * 360;
    const distance = 600 + Math.random() * 200;
    const rad = (angle * Math.PI) / 180;

    petal.style.transition = 'transform 4s cubic-bezier(0.22, 1, 0.36, 1), opacity 4s ease-in-out';
    petal.style.transform = `translate(${Math.cos(rad) * distance}px, ${Math.sin(rad) * distance}px) rotate(${(Math.random() * 60) - 30}deg)`;
    petal.style.opacity = '0';
  });

  setTimeout(() => {
    poemScreen.classList.add('visible');
    startTyping(poem, poemTextElem, () => {
      happyText.classList.add('show');
    });
  }, 1800);
});

function startTyping(text, element, callback) {
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      let delay = 15 + Math.random() * 40;
      if (text.charAt(i - 1) === ',' || text.charAt(i - 1) === '—') delay += 100;
      if (text.charAt(i - 1) === '.' || text.charAt(i - 1) === '\n') delay += 250;
      setTimeout(type, delay);
    } else {
      if (callback) callback();
    }
  }

  type();
}
