const sliderItems = Array.from(document.querySelectorAll('.index__our-values__carousel-card'));
const prevBtn = document.querySelector('.carousel__left-arrow');
const nextBtn = document.querySelector('.carousel__right-arrow');
const slideContainer = document.querySelector(".index__our-values__carousel-line");

let currentIndex = 0;

function renderSlide() {
  // Очищаємо контейнер перед додаванням нових елементів
  slideContainer.innerHTML = '';

  // Додаємо поточний слайд
  slideContainer.appendChild(sliderItems[currentIndex]);

  // Якщо ширина вікна більше 800px, додаємо наступний слайд
  if (window.matchMedia('(min-width:800px)').matches) {
    const secondSlideIdx = (currentIndex + 1 >= sliderItems.length) ? 0 : currentIndex + 1;
    slideContainer.appendChild(sliderItems[secondSlideIdx]);

    // Якщо ширина вікна більше 1150px, додаємо ще один слайд
    if (window.matchMedia('(min-width:1150px)').matches) {
      const thirdSlideIdx = (secondSlideIdx + 1 >= sliderItems.length) ? 0 : secondSlideIdx + 1;
      slideContainer.appendChild(sliderItems[thirdSlideIdx]);
    }
  }
}

function getMaxHeight(items) {
  let maxHeightOfCards = 0;
  items.forEach(item => {
    const itemHeight = item.offsetHeight;
    if (itemHeight > maxHeightOfCards) {
      maxHeightOfCards = itemHeight;
    }
  });
  return maxHeightOfCards;
}

function goToSlide(index) {
  currentIndex = index;
  renderSlide();
}

function nextSlide() {
  currentIndex = (currentIndex + 1 >= sliderItems.length) ? 0 : currentIndex + 1;
  renderSlide();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 < 0) ? sliderItems.length - 1 : currentIndex - 1;
  renderSlide();
}

// Додаємо обробники подій для кнопок "Наступний" та "Попередній"
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Викликаємо функцію рендерингу слайдів
renderSlide();

// Обробник подій для реагування на зміну розміру вікна
window.addEventListener('resize', renderSlide);

// Отримуємо максимальну висоту карток та задаємо її як властивість CSS
const maxHeightOfCards = getMaxHeight(sliderItems);
document.documentElement.style.setProperty('--max-card-height', `${maxHeightOfCards}px`);
console.log(maxHeightOfCards);
