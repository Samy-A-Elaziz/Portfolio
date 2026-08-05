/**
 * APP.JS
 * The main entry point for the site. Each numbered block below sets up one
 * independent feature, so if you ever want to remove or change a feature,
 * you can safely edit just that block.
 */
document.addEventListener("DOMContentLoaded", () => {

    // 1. Typewriter text in the hero section ("Expertise in ...")
    new TypingEffect("typingTarget", [
        "Veterinary Medicine Systems",
        "Data Analysis & Business Intelligence",
        "AI & Automation",
        "Freelance Data Services"
    ]);

    // 2. Glow blob that follows the mouse in the hero section
    initMouseGlow();

    // 3. Thin progress bar at the top of the page that fills as you scroll
    initScrollProgressBar();

    // 4. Contact form validation
    initContactForm();

    // 5. Mobile hamburger menu (open/close + auto-close on link click)
    initMobileMenu();

    // 6. Highlights the nav link matching whichever section is on screen
    initActiveNavLinkTracking();

    // 7. Floating "back to top" button
    initBackToTopButton();

    // 8. Hides the loading screen once the page has fully loaded
    initPageLoader();


    /* ------------------------------------------------------------------ */
    function initMouseGlow() {
        const glowElement = document.getElementById("mouseGlowBlob");
        if (!glowElement) return;

        window.addEventListener("mousemove", (event) => {
            const scrollOffset = window.scrollY;
            glowElement.style.left = `${event.clientX}px`;
            glowElement.style.top = `${event.clientY + scrollOffset}px`;
        });
    }


    /* ------------------------------------------------------------------ */
    function initScrollProgressBar() {
        const progressBar = document.getElementById("progressBar");
        if (!progressBar) return;

        window.addEventListener("scroll", () => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollableHeight <= 0) return;

            const scrolledPercent = (window.scrollY / scrollableHeight) * 100;
            progressBar.style.width = `${scrolledPercent}%`;
        });
    }


    /* ------------------------------------------------------------------ */
    function initContactForm() {
        const form = document.getElementById("contactForm");
        const successMessage = document.getElementById("formSuccessMessage");
        if (!form) return;

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameField = document.getElementById("frmName");
            const emailField = document.getElementById("frmEmail");
            const messageField = document.getElementById("frmMsg");

            let isFormValid = true;

            // Name must be at least 2 characters
            if (nameField.value.trim().length < 2) {
                document.getElementById("errName").style.display = "block";
                isFormValid = false;
            } else {
                document.getElementById("errName").style.display = "none";
            }

            // Basic email format check
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value.trim())) {
                document.getElementById("errEmail").style.display = "block";
                isFormValid = false;
            } else {
                document.getElementById("errEmail").style.display = "none";
            }

            // Message must be at least 10 characters
            if (messageField.value.trim().length < 10) {
                document.getElementById("errMsg").style.display = "block";
                isFormValid = false;
            } else {
                document.getElementById("errMsg").style.display = "none";
            }

            if (isFormValid) {
                // NOTE: this demo form only shows a success message — it does not
                // actually send an email anywhere. To make it functional, hook
                // this up to a form backend (e.g. Formspree, EmailJS) or your
                // own server, then call that here instead.
                form.style.display = "none";
                successMessage.style.display = "block";
            }
        });
    }


    /* ------------------------------------------------------------------ */
    function initMobileMenu() {
        const hamburgerButton = document.getElementById("hamburger");
        const navMenu = document.getElementById("navMenu");
        if (!hamburgerButton || !navMenu) return;

        hamburgerButton.addEventListener("click", () => {
            const isOpen = hamburgerButton.getAttribute("aria-expanded") === "true";
            hamburgerButton.setAttribute("aria-expanded", String(!isOpen));
            navMenu.classList.toggle("mobile-menu-active");
        });

        // Close the menu automatically when a nav link is tapped
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                hamburgerButton.setAttribute("aria-expanded", "false");
                navMenu.classList.remove("mobile-menu-active");
            });
        });
    }


    /* ------------------------------------------------------------------ */
    function initActiveNavLinkTracking() {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-link");

        const options = { root: null, rootMargin: "-30% 0px -60% 0px", threshold: 0 };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const visibleSectionId = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.remove("active-route");
                    if (link.getAttribute("href") === `#${visibleSectionId}`) {
                        link.classList.add("active-route");
                    }
                });
            });
        }, options);

        sections.forEach((section) => sectionObserver.observe(section));
    }


    /* ------------------------------------------------------------------ */
    function initBackToTopButton() {
        const button = document.getElementById("backToTopBtn");
        if (!button) return;

        // Show the button only after scrolling down a bit
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                button.classList.add("is-visible");
            } else {
                button.classList.remove("is-visible");
            }
        });

        // Scroll smoothly back to the top when clicked
        button.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    /* ------------------------------------------------------------------ */
    function initPageLoader() {
        const loader = document.getElementById("loader");
        if (!loader) return;

        window.addEventListener("load", () => {
            setTimeout(() => loader.classList.add("fade-out-complete"), 600);
        });
    }
});
