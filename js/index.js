

function init() {
  import("./menu.js");
  import("./index.carousel.js");
  import("./counter.js");
  import("./elastic-search.js");
  import("./count_sum.js");
  
}


const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});

console.log(`GITHUB_TOKEN is: ${process.env.FOR_AVGUST}`);

