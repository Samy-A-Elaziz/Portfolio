/**
 * CURSOR.JS
 * Draws a small circle (#customCursor in index.html) that smoothly follows
 * the mouse. "Smoothly" here means it eases toward the mouse position
 * instead of jumping straight to it, which gives it a soft, floaty feel.
 *
 * NOTE: this only matters on devices with a real mouse. On touch devices
 * there is no mousemove, so the cursor element simply never appears.
 */
class CustomCursor {
    constructor(cursorElementId) {
        this.cursorElement = document.getElementById(cursorElementId);
        if (!this.cursorElement) return;

        // Current on-screen position (eases toward the target every frame)
        this.currentX = 0;
        this.currentY = 0;

        // Actual mouse position (updated instantly on mousemove)
        this.targetX = 0;
        this.targetY = 0;

        // How quickly the cursor "catches up" to the mouse (0-1, higher = snappier)
        this.easingSpeed = 0.12;

        this.hasMouseMoved = false;

        this.bindEvents();
        this.animate();
    }

    bindEvents() {
        window.addEventListener("mousemove", (event) => {
            if (!this.hasMouseMoved) {
                this.cursorElement.style.opacity = "1";
                this.hasMouseMoved = true;
            }
            this.targetX = event.clientX;
            this.targetY = event.clientY;
        });

        // Hide the cursor dot when the mouse leaves the browser window
        document.addEventListener("mouseleave", () => {
            this.cursorElement.style.opacity = "0";
            this.hasMouseMoved = false;
        });
    }

    // Runs every animation frame to move the cursor a little closer to the mouse
    animate() {
        this.currentX += (this.targetX - this.currentX) * this.easingSpeed;
        this.currentY += (this.targetY - this.currentY) * this.easingSpeed;

        this.cursorElement.style.transform =
            `translate3d(calc(${this.currentX}px - 50%), calc(${this.currentY}px - 50%), 0)`;

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener("DOMContentLoaded", () => new CustomCursor("customCursor"));
