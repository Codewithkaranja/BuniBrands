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

      // Service Tabs
      const serviceTabs = document.querySelectorAll(".service-tab");
      const serviceContents = document.querySelectorAll(".service-content");

      serviceTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          // Remove active class from all tabs and contents
          serviceTabs.forEach((t) => t.classList.remove("active"));
          serviceContents.forEach((c) => c.classList.remove("active"));

          // Add active class to clicked tab
          tab.classList.add("active");

          // Show corresponding content
          const tabId = tab.getAttribute("data-tab");
          document.getElementById(tabId).classList.add("active");
        });
      });

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