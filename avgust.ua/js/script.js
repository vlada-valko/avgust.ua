const body = document.querySelector("body");
const menu__list = document.querySelector(".menu__list");
const btnSub = document.querySelector(".menu__burger");
const navLinks = document.querySelector(".menu__list__link");
const wrapper = document.querySelector(".wrapper");
const menu = document.querySelector(".menu");
const menu__burger__line = document.querySelector(".menu__burger__line");


btnSub.addEventListener("click", () => {
    wrapper.classList.toggle("overflow-hidden");
    menu__list.classList.toggle("nav-visible");
	menu__burger__line.classList.toggle("nav-visible");
})

navLinks.addEventListener("click", () => {
    body.classList.remove("overflow-hidden");
    menu__list.classList.remove("nav-visible");
	menu__list.classList.remove("nav-visible");
	menu__burger__line.classList.remove("nav-visible");

})