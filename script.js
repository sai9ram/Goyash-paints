const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dotsContainer = document.querySelector('.slide-dots');

let currentSlide = 0;
let intervalId;

function renderDots() {
  if (!dotsContainer) return;
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show slide ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  if (!dotsContainer) return;
  const dots = Array.from(dotsContainer.children);
  dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
}

function showSlide(index) {
  if (slides.length === 0) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });
  updateDots();
}

function startAutoPlay() {
  if (slides.length === 0) return;
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

if (slides.length > 0 && dotsContainer) {
  renderDots();
  showSlide(0);
  startAutoPlay();
  window.addEventListener('mouseenter', () => clearInterval(intervalId));
  window.addEventListener('mouseleave', startAutoPlay);
}

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedCards = document.querySelectorAll('.fade-in-card');
  animatedCards.forEach(card => observer.observe(card));

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other accordions
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Start Testimonial auto rotation
  startTestimonialAutoPlay();
});

// Testimonial Carousel
let testimonialIndex = 0;
let testimonialInterval;

window.setSlide = function(index) {
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.carousel-dots .dot');
  if (testimonialSlides.length === 0) return;
  
  testimonialIndex = (index + testimonialSlides.length) % testimonialSlides.length;
  
  testimonialSlides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === testimonialIndex);
  });
  
  testimonialDots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === testimonialIndex);
  });
  
  // Reset auto-play timer on manual interaction
  startTestimonialAutoPlay();
};

function startTestimonialAutoPlay() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    if (testimonialSlides.length > 0) {
      window.setSlide(testimonialIndex + 1);
    }
  }, 7000);
}
