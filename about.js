// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
  body.classList.toggle("menu-open");
  
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when clicking on links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
    const icon = hamburger.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("active") && 
      !navLinks.contains(e.target) && 
      !hamburger.contains(e.target)) {
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
    const icon = hamburger.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
    const icon = hamburger.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
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

// Animated Counters
const counters = document.querySelectorAll(".achievement-number");
const speed = 200;

function animateAchievementCounters() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateAchievementCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Animated Counter for Hero Stats
function animateHeroCounters() {
  const heroCounters = document.querySelectorAll('.stat-number');
  
  heroCounters.forEach(counter => {
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

// Fade In Animation on Scroll
const fadeElements = document.querySelectorAll(".fade-in");

function checkFade() {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("visible");

      // Animate achievement counters when they come into view
      if (element.querySelector(".achievement-number")) {
        animateAchievementCounters();
      }
    }
  });
}

// Particle System for Hero Section
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    pageHero.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 6;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(particle);
    }
  }
}

// Mouse Move Parallax Effect
function initParallax() {
  const hero = document.querySelector('.page-hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const moveX = x * 20;
      const moveY = y * 20;
      
      hero.style.transform = `perspective(1000px) rotateX(${y * 2}deg) rotateY(${x * 2}deg)`;
      hero.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });
    
    hero.addEventListener('mouseleave', () => {
      hero.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      hero.style.backgroundPosition = 'center center';
    });
  }
}

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
        body.classList.remove("menu-open");
        const icon = hamburger.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  initParallax();
  
  // Animate hero counters when hero section is in view
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateHeroCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  });
  
  const heroSection = document.querySelector('.page-hero');
  if (heroSection) {
    heroObserver.observe(heroSection);
  }
  
  // Initial fade check
  checkFade();
});

window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);