

function init() {
  import("./menu.js");
  import("./index.carousel.js");
  import("./counter.js");
  import("./our-culture-accordeon.js");
  import("./our-team-import.js");


}
const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});