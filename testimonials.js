 // Mobile Navigation Toggle
      const hamburger = document.querySelector(".hamburger");
      const navLinks = document.querySelector(".nav-links");

      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.innerHTML = navLinks.classList.contains("active")
          ? '<i class="fas fa-times"></i>'
          : '<i class="fas fa-bars"></i>';
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
      const prevBtn = document.querySelector(".slider-prev");
      const nextBtn = document.querySelector(".slider-next");
      let currentSlide = 0;

      function showSlide(n) {
        testimonialSlides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        currentSlide =
          (n + testimonialSlides.length) % testimonialSlides.length;

        testimonialSlides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
      }

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index);
        });
      });

      prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
      });

      nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
      });

      // Auto slide testimonials
      setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);

      // Fade In Animation on Scroll
      const fadeElements = document.querySelectorAll(".fade-in");

      function checkFade() {
        fadeElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (elementTop < windowHeight - 100) {
            element.classList.add("visible");
          }
        });
      }

      window.addEventListener("scroll", checkFade);
      window.addEventListener("load", checkFade);
// Testimonial Hero Animations
function createTestimonialParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'testimonial-particles';
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    pageHero.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'testimonial-particle';
      
      const size = Math.random() * 3 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 8;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(particle);
    }
  }
}

// Animated Counter for Trust Indicators
function animateTrustCounters() {
  const counters = document.querySelectorAll('.trust-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

// Initialize testimonial hero animations
document.addEventListener('DOMContentLoaded', function() {
  createTestimonialParticles();
  
  // Animate trust counters when hero section is in view
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateTrustCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  });
  
  const heroSection = document.querySelector('.page-hero');
  if (heroSection) {
    heroObserver.observe(heroSection);
  }
});
      // Smooth Scrolling for Anchor Links
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

            // Close mobile menu if open
            if (navLinks.classList.contains("active")) {
              navLinks.classList.remove("active");
              hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
          }
        });
      });