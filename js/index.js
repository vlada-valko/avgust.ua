

function init() {
  import("./menu.js");
  import("./index.carousel.js");
  import("./counter.js");
  import("./our-culture-accordeon.js");
  import("./elastic-search.js");


}


const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});