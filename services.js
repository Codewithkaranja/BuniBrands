// services.js - Complete Rewrite
console.log("🚀 services.js loaded successfully!");

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM fully loaded");
    initApp();
});

function initApp() {
    console.log("🔄 Initializing application...");
    
    // Initialize all components
    initMobileNavigation();
    initScrollEffects();
    initServiceTabs();
    initScrollAnimations();
    initSmoothScrolling();
    initMenuCloseHandlers();
    
    console.log("✅ All components initialized");
}

// 1. Mobile Navigation
function initMobileNavigation() {
    console.log("🔄 Initializing mobile navigation...");
    
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (!hamburger) {
        console.error("❌ Hamburger button not found!");
        return;
    }
    
    if (!navLinks) {
        console.error("❌ Navigation links not found!");
        return;
    }
    
    console.log("✅ Found hamburger and nav links");
    
    // Hamburger click event
    hamburger.addEventListener("click", function(e) {
        console.log("🍔 Hamburger clicked!");
        e.stopPropagation(); // Prevent event bubbling
        
        const isActive = navLinks.classList.contains("active");
        console.log("Menu currently active:", isActive);
        
        // Toggle menu
        navLinks.classList.toggle("active");
        
        // Update icon and aria attributes
        if (navLinks.classList.contains("active")) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
            hamburger.setAttribute("aria-expanded", "true");
            console.log("📱 Menu opened");
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.setAttribute("aria-expanded", "false");
            console.log("📱 Menu closed");
        }
    });
    
    // Close menu when clicking on links
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            console.log("🔗 Nav link clicked, closing menu");
            closeMobileMenu(hamburger, navLinks);
        });
    });
    
    console.log("✅ Mobile navigation initialized");
}

// 2. Header Scroll Effect
function initScrollEffects() {
    console.log("🔄 Initializing scroll effects...");
    
    const header = document.getElementById("header");
    if (!header) {
        console.error("❌ Header element not found!");
        return;
    }
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
    
    console.log("✅ Scroll effects initialized");
}

// 3. Service Tabs
function initServiceTabs() {
    console.log("🔄 Initializing service tabs...");
    
    const serviceTabs = document.querySelectorAll(".service-tab");
    const serviceContents = document.querySelectorAll(".service-content");
    
    if (serviceTabs.length === 0) {
        console.log("ℹ️ No service tabs found");
        return;
    }
    
    serviceTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            console.log("📑 Service tab clicked:", tab.textContent.trim());
            
            // Remove active class from all tabs and contents
            serviceTabs.forEach((t) => t.classList.remove("active"));
            serviceContents.forEach((c) => c.classList.remove("active"));
            
            // Add active class to clicked tab
            tab.classList.add("active");
            
            // Show corresponding content
            const tabId = tab.getAttribute("data-tab");
            const targetContent = document.getElementById(tabId);
            
            if (targetContent) {
                targetContent.classList.add("active");
                console.log("✅ Showing content for:", tabId);
            } else {
                console.error("❌ Content not found for tab:", tabId);
            }
        });
    });
    
    console.log("✅ Service tabs initialized");
}

// 4. Scroll Animations
function initScrollAnimations() {
    console.log("🔄 Initializing scroll animations...");
    
    const fadeElements = document.querySelectorAll(".fade-in");
    
    if (fadeElements.length === 0) {
        console.log("ℹ️ No fade-in elements found");
        return;
    }
    
    let isScrolling = false;
    
    function checkFade() {
        if (isScrolling) return;
        
        isScrolling = true;
        
        requestAnimationFrame(() => {
            fadeElements.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    if (!element.classList.contains("visible")) {
                        element.classList.add("visible");
                        console.log(`🎯 Element ${index + 1} became visible`);
                    }
                }
            });
            
            isScrolling = false;
        });
    }
    
    // Initial check
    checkFade();
    
    // Scroll event with throttling
    window.addEventListener("scroll", checkFade, { passive: true });
    
    console.log("✅ Scroll animations initialized");
}

// 5. Smooth Scrolling
function initSmoothScrolling() {
    console.log("🔄 Initializing smooth scrolling...");
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    if (anchorLinks.length === 0) {
        console.log("ℹ️ No anchor links found");
        return;
    }
    
    anchorLinks.forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                console.log("🎯 Smooth scrolling to:", targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector(".nav-links");
                const hamburger = document.querySelector(".hamburger");
                if (navLinks && navLinks.classList.contains("active")) {
                    closeMobileMenu(hamburger, navLinks);
                }
            } else {
                console.error("❌ Target element not found:", targetId);
            }
        });
    });
    
    console.log("✅ Smooth scrolling initialized");
}

// 6. Menu Close Handlers
function initMenuCloseHandlers() {
    console.log("🔄 Initializing menu close handlers...");
    
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (!hamburger || !navLinks) {
        console.error("❌ Menu elements not found for close handlers");
        return;
    }
    
    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            if (navLinks.classList.contains("active")) {
                console.log("👆 Clicked outside, closing menu");
                closeMobileMenu(hamburger, navLinks);
            }
        }
    });
    
    // Close with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navLinks.classList.contains("active")) {
            console.log("⌨️ Escape key pressed, closing menu");
            closeMobileMenu(hamburger, navLinks);
        }
    });
    
    console.log("✅ Menu close handlers initialized");
}

// Utility function to close mobile menu
function closeMobileMenu(hamburger, navLinks) {
    if (!hamburger || !navLinks) return;
    
    navLinks.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    console.log("📱 Mobile menu closed");
}

// Error handling for any uncaught errors
window.addEventListener('error', function(e) {
    console.error('💥 Global error:', e.error);
});

console.log("🎉 services.js setup complete - waiting for DOM...");