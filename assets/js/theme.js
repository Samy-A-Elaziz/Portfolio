/**
 * THEME.JS
 * Handles switching between dark and light mode, and remembers the
 * person's choice in localStorage so it stays the same next time they visit.
 */
(function () {
    const STORAGE_KEY = "samy_portfolio_theme";
    const htmlElement = document.documentElement;

    // 1. Work out which theme to start with:
    //    - use whatever was saved last time, OR
    //    - fall back to the visitor's OS/browser preference.
    function getInitialTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme) return savedTheme;

        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        return prefersLight ? "light" : "dark";
    }

    // 2. Apply a theme by setting the data-theme attribute (style.css reacts to this)
    function applyTheme(theme) {
        htmlElement.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    let currentTheme = getInitialTheme();
    applyTheme(currentTheme);

    // 3. Wire up the toggle button once the page has loaded
    document.addEventListener("DOMContentLoaded", () => {
        const toggleButton = document.getElementById("themeToggle");
        if (!toggleButton) return;

        toggleButton.addEventListener("click", () => {
            currentTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(currentTheme);
        });
    });
})();
