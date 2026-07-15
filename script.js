const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dotsContainer = document.querySelector('.slide-dots');

let currentSlide = 0;
let intervalId;

function renderDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show slide ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = Array.from(dotsContainer.children);
  dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
}

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });
  updateDots();
}

function startAutoPlay() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

renderDots();
showSlide(0);
startAutoPlay();

window.addEventListener('mouseenter', () => clearInterval(intervalId));
window.addEventListener('mouseleave', startAutoPlay);
