/* ============================================================
   MOBILE NAVIGATION
============================================================ */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}

/* ============================================================
   HEADER SCROLL EFFECT
============================================================ */
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (!header) return;

  window.scrollY > 100
    ? header.classList.add("scrolled")
    : header.classList.remove("scrolled");
});

/* ============================================================
   TESTIMONIAL SLIDER (Custom)
============================================================ */
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".slider-dot");
const prevBtn = document.querySelector(".slider-prev");
const nextBtn = document.querySelector(".slider-next");

let currentSlide = 0;

function showSlide(n) {
  if (!testimonialSlides.length) return;

  testimonialSlides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;

  testimonialSlides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Dot Navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

// Prev/Next
if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

// Auto Slide
setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);

/* ============================================================
   FADE-IN ANIMATION ON SCROLL
============================================================ */
const fadeElements = document.querySelectorAll(".fade-in");

function checkFade() {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 100) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);

/* ============================================================
   TESTIMONIAL PARTICLES (Decorative Hero Animation)
============================================================ */
function createTestimonialParticles() {
  const pageHero = document.querySelector('.page-hero');
  if (!pageHero) return;

  const container = document.createElement('div');
  container.className = 'testimonial-particles';
  pageHero.appendChild(container);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'testimonial-particle';

    particle.style.width = particle.style.height = `${Math.random() * 3 + 1}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;

    container.appendChild(particle);
  }
}

/* ============================================================
   TRUST COUNTERS (Animated Numbers)
============================================================ */
function animateTrustCounters() {
  const counters = document.querySelectorAll('.trust-number');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    if (!target) return;

    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      current += step;
      counter.textContent = Math.floor(current);

      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  });
}

// Initialize Hero Effects
document.addEventListener('DOMContentLoaded', () => {
  createTestimonialParticles();

  const heroSection = document.querySelector('.page-hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateTrustCounters();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(heroSection);
  }
});

/* ============================================================
   SMOOTH SCROLLING (Anchors)
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });

    // Close mobile nav
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

/* ============================================================
   CLIENT LOGOS SWIPER SLIDER
============================================================ */
var swiper = new Swiper(".clientsSwiper", {
  slidesPerView: 5,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
