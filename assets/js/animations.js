/**
 * ANIMATIONS.JS
 * Uses the browser's IntersectionObserver to detect when elements scroll
 * into view, then:
 *   1. Adds the "reveal-active" class (fades/slides them in — see animations.css)
 *   2. Fills in any skill progress bars inside that element
 *   3. Starts counting up any number counters inside that element
 */
document.addEventListener("DOMContentLoaded", () => {

    const observerOptions = { threshold: 0.12, rootMargin: "0px 0px -40px 0px" };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("reveal-active");

            // Fill any skill meter bars found inside this element
            const skillBars = entry.target.querySelectorAll(".skill-meter .fill");
            skillBars.forEach((bar) => {
                bar.style.width = bar.getAttribute("data-width");
            });

            // Animate any number counters found inside this element
            const counters = entry.target.querySelectorAll(".counter-number");
            counters.forEach((counter) => {
                if (!counter.classList.contains("counted-complete")) {
                    animateCounter(counter);
                }
            });

            // Only need to animate an element once
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    const elementsToWatch = document.querySelectorAll(".scroll-reveal, .skill-category-card, .counter-box");
    elementsToWatch.forEach((element) => revealObserver.observe(element));

    /**
     * Counts a number up from 0 to its target value (set via data-target="123"
     * on the element) over roughly 60 animation frames.
     */
    function animateCounter(counterElement) {
        const targetValue = parseInt(counterElement.getAttribute("data-target"), 10);
        const totalFrames = 60;
        const stepAmount = Math.ceil(targetValue / totalFrames);

        let currentValue = 0;
        counterElement.classList.add("counted-complete");

        function step() {
            currentValue += stepAmount;
            if (currentValue >= targetValue) {
                counterElement.textContent = targetValue;
            } else {
                counterElement.textContent = currentValue;
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }
});
