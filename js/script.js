const btnBurger = document.querySelector(".menu-btn");
const btnArrowAboutCompany = document.querySelector(".menu-btn-about-company");
const navLinks = document.querySelectorAll(".nav-list__item");
const submenuAboutCompany = document.querySelector(".submenu__about-company");
const burgerLine = document.querySelector(".menu-burger");

const body = document.querySelector("body");
const headerNavMenu = document.querySelector(".header__nav-menu");

btnBurger.addEventListener("click", () => {
  body.classList.toggle("overflow-hidden");
  headerNavMenu.classList.toggle("nav-visible");
burgerLine.classList.toggle("nav-visible");
});

btnArrowAboutCompany.addEventListener("click", () => {
  submenuAboutCompany.classList.toggle("submenu__visible");

});

