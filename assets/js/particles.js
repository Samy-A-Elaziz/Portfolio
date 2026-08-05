/**
 * PARTICLES.JS
 * Draws small floating dots in the hero section's <canvas id="particlesCanvas">
 * to give the background some subtle motion. Purely decorative.
 */
class ParticleBackground {
    constructor(canvasId, particleCount = 65) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");
        this.particleCount = particleCount;
        this.particles = [];

        this.resizeCanvas();
        this.createParticles();
        window.addEventListener("resize", () => this.resizeCanvas());
        this.tick();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5 + 1,
                speedX: (Math.random() - 0.5) * 0.35,
                speedY: (Math.random() - 0.5) * 0.35,
                opacity: Math.random() * 0.4 + 0.1
            });
        }
    }

    // Draws one frame: move every particle a tiny bit, bounce off the edges,
    // then paint it. Runs continuously via requestAnimationFrame.
    tick() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Particles change color slightly depending on dark/light theme
        const isDarkTheme = (document.documentElement.getAttribute("data-theme") || "dark") === "dark";
        const particleColor = isDarkTheme ? "6, 182, 214" : "59, 130, 246";

        this.particles.forEach((particle) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.tick());
    }
}

document.addEventListener("DOMContentLoaded", () => new ParticleBackground("particlesCanvas"));
