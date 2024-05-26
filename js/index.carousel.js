const sliderItems = Array.from(document.querySelectorAll('.index__our-values__carousel-card'));
const prevBtn = document.querySelector('.carousel__left-arrow');
const nextBtn = document.querySelector('.carousel__right-arrow');
const slideContainer = document.querySelector(".index__our-values__carousel-line");

let currentIndex = 0;

const maxHeightOfCards = getMaxHeight(sliderItems);
document.documentElement.style.setProperty('--max-card-height', `${maxHeightOfCards}px`);
console.log(maxHeightOfCards);

function renderSlide() {
  slideContainer.innerHTML = '';
  slideContainer.appendChild(sliderItems[currentIndex]);
  
  const prevSlideIdx = (currentIndex - 1 < 0) ? sliderItems.length - 1 : currentIndex - 1;
  const nextSlideIdx = (currentIndex + 1 >= sliderItems.length) ? 0 : currentIndex + 1;
  
  slideContainer.appendChild(sliderItems[nextSlideIdx]);
  slideContainer.insertBefore(sliderItems[prevSlideIdx], slideContainer.firstChild);

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

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

renderSlide();

window.addEventListener('resize', renderSlide);
