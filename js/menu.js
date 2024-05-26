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
      textElement.classList.toggle("submenu__visible");
    });
    btnArrowElements.forEach((arrowElement) => {
      arrowElement.classList.toggle("submenu__visible");
    });
  });
});



navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Перевіряємо, чи клас поточного посилання є в масиві menuBtnClasses
    const isLinkInMenuBtnClasses = menuBtnClasses.some(menuBtnClass => link.classList.contains(menuBtnClass));
    
    if (!isLinkInMenuBtnClasses) {
      // Якщо клас поточного посилання НЕ входить в масив menuBtnClasses, виконуємо наступний код
      
      // Знімаємо клас "submenu__visible" з усіх підменю
      submenuClasses.forEach((classItem) => {
        const submenu = document.querySelector(classItem);
        if (submenu) {
          submenu.classList.remove("submenu__visible");
        }
      });

      // Знімаємо клас "nav-visible" з усіх елементів меню
      headerNavMenu.classList.remove("nav-visible");
      burgerLine.classList.remove("nav-visible");
      wrapper.classList.remove("nav-visible");

      // Знімаємо клас "overflow-hidden" з body
      body.classList.remove("overflow-hidden");
    }
  });
});