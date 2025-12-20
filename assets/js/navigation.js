/**
 * Navigation Functionality
 * Handles auto-hide on scroll and dropdown menu
 */

// Auto-hide navigation on scroll
let lastScroll = window.pageYOffset;
const header = document.querySelector('header.nav');
const dropdown = document.querySelector('.nav-item.dropdown');
let isDropdownOpen = false;

// Dropdown click toggle for mobile
const dropdownLink = dropdown?.querySelector('.nav-link');
if (dropdownLink) {
    dropdownLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent navigation to #sluzby
        isDropdownOpen = !isDropdownOpen;
        dropdown.classList.toggle('dropdown-active', isDropdownOpen);
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target) && isDropdownOpen) {
        isDropdownOpen = false;
        dropdown.classList.remove('dropdown-active');
    }
});

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;

            // Don't hide menu if dropdown is open
            if (isDropdownOpen) {
                lastScroll = currentScroll;
                ticking = false;
                return;
            }

            // Scrolling down
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('nav-hidden');
            }
            // Scrolling up
            else if (currentScroll < lastScroll) {
                header.classList.remove('nav-hidden');
            }

            lastScroll = currentScroll;
            ticking = false;
        });

        ticking = true;
    }
});
