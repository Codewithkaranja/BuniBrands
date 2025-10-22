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

      // Auto slide testimonials
      setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);

      // Animated Counters
      const counters = document.querySelectorAll(".stat-number");
      const speed = 200;

      function animateCounters() {
        counters.forEach((counter) => {
          const target = +counter.getAttribute("data-count");
          const count = +counter.innerText;
          const increment = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
          } else {
            counter.innerText = target;
          }
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

            // Animate counters when they come into view
            if (element.querySelector(".stat-number")) {
              animateCounters();
            }
          }
        });
      }

      window.addEventListener("scroll", checkFade);
      window.addEventListener("load", checkFade);

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
      // Previous JavaScript remains the same

      // Fade In Animation on Scroll for client items
      //const fadeElements = document.querySelectorAll(".fade-in");

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