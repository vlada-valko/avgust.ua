const btnBurger = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll(".nav-list__item");
const burgerLine = document.querySelector(".menu-burger");
const body = document.querySelector("body");
const headerNavMenu = document.querySelector(".header__nav-menu");
const wrapper = document.querySelector(".wrapper");

btnBurger.addEventListener("click", () => {
  body.classList.toggle("overflow-hidden");
  headerNavMenu.classList.toggle("nav-visible");
  burgerLine.classList.toggle("nav-visible");
  wrapper.classList.toggle("nav-visible");
});

/* SUBMENU */
// Створюємо масив з іменами класів кнопок меню
const menuBtnClasses = [".menu-btn-about-company", ".menu-btn-department", ".menu-btn-information", ".menu-btn-education"];

// Створюємо масив з іменами класів підменю
const submenuClasses = [".submenu__about-company", ".submenu__department", ".submenu__information", ".submenu__education"];

// Створюємо масив з іменами класів тексту кнопок
const btnTextClasses = [".menu-btn-about-company-text", ".menu-btn-department-text", ".menu-btn-information-text", ".menu-btn-education-text"];

// Створюємо масив з іменами класів стрілок кнопок
const btnArrowClasses = [".menu-arrow-about-company", ".menu-arrow-department", ".menu-arrow-information", ".menu-arrow-education"];

const toClose = [".submenu__about-company", ".submenu__department", ".submenu__information", ".submenu__education", ".nav-list__item-dont-close"];

// Функція для оновлення висоти підменю
function updateSubmenuHeight() {
  // Отримуємо підменю, які відображені
  const visibleSubmenus = document.querySelectorAll('.submenu__visible');

  // Рахуємо висоту підменю
  const submenuHeight = (visibleSubmenus.length * 115) + 'px';

  // Зберігаємо висоту підменю в змінну для подальшого використання
  submenuClasses.forEach((classItem) => {
    const submenu = document.querySelector(classItem);
    submenu.style.setProperty('--submenu-height', submenuHeight);
  });
}

// Проходимось по кожному елементу масиву кнопок меню і додаємо подію click
menuBtnClasses.forEach((menuBtnClass, index) => {
  const menuBtn = document.querySelector(menuBtnClass);
  const submenu = document.querySelector(submenuClasses[index]);
  const btnTextElements = document.querySelectorAll(btnTextClasses[index]);
  const btnArrowElements = document.querySelectorAll(btnArrowClasses[index]);

  menuBtn.addEventListener("click", () => {
    // Знімаємо клас "submenu__visible" з усіх підменю, btnText та btnArrow
    submenuClasses.forEach((classItem, idx) => {
      const otherSubmenu = document.querySelector(classItem);
      const otherBtnText = document.querySelectorAll(btnTextClasses[idx]);
      const otherBtnArrow = document.querySelectorAll(btnArrowClasses[idx]);
      if (otherSubmenu !== submenu) {
        otherSubmenu.classList.remove("submenu__visible");
        otherBtnText.forEach((textElement) => {
          textElement.classList.remove("submenu__visible");
        });
        otherBtnArrow.forEach((arrowElement) => {
          arrowElement.classList.remove("submenu__visible");
        });
      }
    });

    // Додаємо або знімаємо клас "submenu__visible" відповідно до потрібного підменю, btnText та btnArrow
    submenu.classList.toggle("submenu__visible");
    btnTextElements.forEach((textElement) => {
      updateSubmenuHeight();
      textElement.classList.toggle("submenu__visible");
    });
    btnArrowElements.forEach((arrowElement) => {
      updateSubmenuHeight();
      arrowElement.classList.toggle("submenu__visible");
    });

    // Оновлюємо висоту підменю
    updateSubmenuHeight();
  });
});

toClose.forEach((link) => {
  console.log(link);
});

const links = document.querySelectorAll('.submenu__about-company a, .submenu__department a, .submenu__information a, .submenu__education a, .nav-list__item-dont-close a');

// Додаємо обробник подій для кожного посилання
links.forEach(link => {
  link.addEventListener('click', () => {
    // Змінюємо клас body при кліку на посилання
    document.body.classList.remove('overflow-hidden');
    headerNavMenu.classList.remove("nav-visible");
    burgerLine.classList.remove("nav-visible");
    wrapper.classList.remove("nav-visible");
    submenuHeight = 0;
  });
});
