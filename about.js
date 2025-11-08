// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

// Function to close mobile menu
function closeMobileMenu() {
  navLinks.classList.remove("active");
  body.classList.remove("menu-open");

  const icon = hamburger.querySelector("i");
  icon.classList.remove("fa-times");
  icon.classList.add("fa-bars");
}

// Hamburger toggle functionality
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();

  // Toggle menu states
  navLinks.classList.toggle("active");
  body.classList.toggle("menu-open");

  // Toggle hamburger icon
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when clicking on navigation links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Close mobile menu when clicking outside (only on mobile)
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

// Close mobile menu on window resize (if resized to desktop)
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// Close menu with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    closeMobileMenu();
  }
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Initialize header state on load for mobile
window.addEventListener("load", () => {
  const header = document.getElementById("header");
  if (window.innerWidth <= 768) {
    header.classList.add("scrolled");
  }
});

// ===== ANIMATED COUNTERS =====
const achievementCounters = document.querySelectorAll(".achievement-number");
const heroCounters = document.querySelectorAll(".stat-number");
const counterSpeed = 200;

// Achievement counters (recursive animation) - WITH PLUS SIGN
function animateAchievementCounters() {
  let allCompleted = true;

  achievementCounters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    const currentText = counter.innerText;
    const count = +currentText.replace("+", ""); // Remove + if present

    if (count < target) {
      allCompleted = false;
      const increment = Math.ceil(target / counterSpeed);
      const newCount = Math.min(count + increment, target);
      counter.innerText = newCount + "+";

      if (newCount < target) {
        setTimeout(animateAchievementCounters, 20);
      }
    }
  });
}

// Hero counters (setInterval animation) - WITH PLUS SIGN
function animateHeroCounters() {
  heroCounters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        counter.textContent = target + "+"; // Add + when complete
      } else {
        counter.textContent = Math.floor(current) + "+"; // Add + during animation
      }
    }, 16);
  });
}

// Initialize counters with plus signs on page load
function initializeCountersWithPlus() {
  // For hero stats (if they exist)
  heroCounters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    counter.textContent = "0+"; // Start with 0+
  });

  // For achievement counters
  achievementCounters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    counter.textContent = "0+"; // Start with 0+
  });
}

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll(".fade-in");

function checkFade() {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("visible");

      // Animate achievement counters when they come into view
      if (
        element.querySelector(".achievement-number") &&
        !element.classList.contains("counters-animated")
      ) {
        element.classList.add("counters-animated");
        setTimeout(animateAchievementCounters, 300); // Small delay for better UX
      }
    }
  });
}

// ===== PARTICLE SYSTEM =====
function createParticles() {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles";
  const pageHero = document.querySelector(".page-hero");

  if (pageHero) {
    pageHero.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

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

// ===== PARALLAX EFFECT =====
function initParallax() {
  const hero = document.querySelector(".page-hero");

  if (hero) {
    hero.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      const moveX = x * 20;
      const moveY = y * 20;

      hero.style.transform = `perspective(1000px) rotateX(${
        y * 2
      }deg) rotateY(${x * 2}deg)`;
      hero.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });

    hero.addEventListener("mouseleave", () => {
      hero.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      hero.style.backgroundPosition = "center center";
    });
  }
}

// ===== SMOOTH SCROLLING =====
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
      closeMobileMenu();
    }
  });
});

// ===== FAQ ACCORDION (if exists on page) =====
const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
}

// ===== FORM SUBMISSION (if exists on page) =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Message Sent Successfully");
    this.reset();
  });
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  // Initialize counters with plus signs
  initializeCountersWithPlus();

  // Initialize animations and effects
  createParticles();
  initParallax();

  // Set up intersection observer for hero counters
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateHeroCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  });

  // Observe hero section for counter animations
  const heroSection = document.querySelector(".page-hero");
  if (heroSection) {
    heroObserver.observe(heroSection);
  }

  // Initial fade check
  checkFade();
});

// ===== EVENT LISTENERS =====
window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events for better performance
window.addEventListener("scroll", debounce(checkFade, 10));

// Console greeting
console.log("🚀 Buni Brands - Professional Branding & Printing Solutions");
console.log("📍 Nairobi, Kenya | 📞 +254 790 256 966");
