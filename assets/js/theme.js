/**
 * Theme Switching Functionality
 * Handles light/dark theme toggle and persistence
 */

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const root = document.documentElement;

// Check for saved theme preference or default to system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

/**
 * Apply theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${theme}-theme`);

    // Toggle icon visibility
    if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    localStorage.setItem('theme', theme);
}

// Set initial theme
setTheme(currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const newTheme = root.classList.contains('dark-theme') ? 'light' : 'dark';
    setTheme(newTheme);
});
