// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".slider-dot");
let currentSlide = 0;

function showSlide(n) {
  testimonialSlides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;

  testimonialSlides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Auto slide testimonials
let slideInterval = setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);

// Pause slider when page is not visible
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    clearInterval(slideInterval);
  } else {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }
});

// HERO IMAGE SLIDER WITH FADE TRANSITION
const heroSlides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
let currentHeroSlide = 0;
let heroSlideInterval;

function initHeroSlider() {
  // Start automatic slideshow
  heroSlideInterval = setInterval(nextHeroSlide, 5000);
  
  // Add click events to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToHeroSlide(index);
    });
  });
}

function nextHeroSlide() {
  const nextSlide = (currentHeroSlide + 1) % heroSlides.length;
  goToHeroSlide(nextSlide);
}

function goToHeroSlide(slideIndex) {
  // Remove active class from all slides and indicators
  heroSlides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // Add active class to new slide and indicator
  heroSlides[slideIndex].classList.add('active');
  indicators[slideIndex].classList.add('active');
  
  currentHeroSlide = slideIndex;
  
  // Reset the timer
  clearInterval(heroSlideInterval);
  heroSlideInterval = setInterval(nextHeroSlide, 3000);
}

// Pause hero slider on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
  clearInterval(heroSlideInterval);
});

heroSection.addEventListener('mouseleave', () => {
  heroSlideInterval = setInterval(nextHeroSlide, 3000);
});

// Initialize hero slider
window.addEventListener('load', initHeroSlider);

// COUNTER ANIMATION - WITH PLUS SIGNS
const statNumbers = document.querySelectorAll(".stat-number");
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  
  countersAnimated = true;
  
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        stat.textContent = Math.floor(current) + '+';
      } else {
        stat.textContent = Math.floor(current) + '+';
      }
    }, 16);
  });
}

// Check if counters are in view
function checkCountersInView() {
  const statsSection = document.querySelector(".why-choose-us");
  if (!statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const sectionBottom = statsSection.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight * 0.8 && sectionBottom > windowHeight * 0.2) {
    animateCounters();
  }
}

// Scroll animations
const fadeElements = document.querySelectorAll(".fade-in");

function checkFade() {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("visible");
    }
  });
  
  checkCountersInView();
}

// Event listeners
window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});
 // Typewriter Effect
      const typewriterElement = document.getElementById("typewriter");
      const words = ["Create", "Brand", "Inspire"];
      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typeSpeed = 100;

      function typeWriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
          typewriterElement.textContent = currentWord.substring(
            0,
            charIndex - 1
          );
          charIndex--;
          typeSpeed = 150;
        } else {
          typewriterElement.textContent = currentWord.substring(
            0,
            charIndex + 1
          );
          charIndex++;
          typeSpeed = 300;
        }

        if (!isDeleting && charIndex === currentWord.length) {
          isDeleting = true;
          typeSpeed = 1000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typeSpeed = 0; // Pause before starting next word
        }

        setTimeout(typeWriter, typeSpeed);
      }

      // Start typewriter effect
      setTimeout(typeWriter, 2000);