// Mobile Navigation Toggle - Enhanced Version
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

// Create overlay element
const overlay = document.createElement("div");
overlay.className = "menu-overlay";
document.body.appendChild(overlay);

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  
  // Toggle menu and overlay
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
  body.classList.toggle("menu-open");
  
  // Change hamburger icon
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close menu when clicking on overlay
overlay.addEventListener("click", () => {
  closeMobileMenu();
});

// Close mobile menu when clicking on links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

// Close mobile menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    closeMobileMenu();
  }
});

// Function to close mobile menu
function closeMobileMenu() {
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
  body.classList.remove("menu-open");
  
  const icon = hamburger.querySelector("i");
  icon.classList.remove("fa-times");
  icon.classList.add("fa-bars");
}

// Header Scroll Effect
// Add this JavaScript to make header change on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

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

// Form Submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Message Sent Successfully");
    this.reset();
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
    }
  });
}

window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);
// Contact Hero Animations
function createContactParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'contact-particles';
  const pageHero = document.querySelector('.page-hero');
  
  if (pageHero) {
    pageHero.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'contact-particle';
      
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

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
  createContactParticles();
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
      closeMobileMenu();
    }
  });
});