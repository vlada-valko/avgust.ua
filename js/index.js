
function init() {
  Promise.all([
      import('./menu.js'),
      import('./counter.js'),
      import('./index.carousel.js')
  ]).then(([menu, counter, carousel]) => {
      // Ви можете викликати функції з імпортованих модулів, якщо необхідно
      // menu.initMenu();
      // counter.initCounter();
      // carousel.initCarousel();
  }).catch(err => {
      console.error('Error loading modules:', err);
  });
}

const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) {
      init();
  }
});
