/**
 * Navigation Functionality
 * Handles auto-hide on scroll and dropdown menu
 */

// Auto-hide navigation on scroll
let lastScroll = window.pageYOffset;
const header = document.querySelector('header.nav');
const dropdown = document.querySelector('.nav-item.dropdown');
let isDropdownOpen = false;

// Dropdown toggle - clicking "Služby" only shows dropdown, no navigation
const dropdownLink = dropdown?.querySelector('.nav-link');
if (dropdownLink) {
    dropdownLink.addEventListener('click', (e) => {
        e.preventDefault(); // Always prevent navigation to #sluzby

        // Toggle dropdown on mobile
        if (window.innerWidth <= 768) {
            isDropdownOpen = !isDropdownOpen;
            dropdown.classList.toggle('dropdown-active', isDropdownOpen);
        }
        // On desktop, show dropdown on hover (handled by CSS)
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

// Hamburger Menu Toggle (Mobile)
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('nav-overlay');
const mainNav = document.querySelector('.main-nav');

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('nav-open');
    navOverlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (mainNav.classList.contains('nav-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mainNav.classList.remove('nav-open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';

    // Also close dropdown if open
    if (isDropdownOpen) {
        isDropdownOpen = false;
        dropdown?.classList.remove('dropdown-active');
    }
}

// Toggle menu when hamburger is clicked
hamburger?.addEventListener('click', toggleMobileMenu);

// Close menu when overlay is clicked
navOverlay?.addEventListener('click', closeMobileMenu);

// Close menu when navigation happens (but not for Services dropdown toggle)
const navLinks = mainNav?.querySelectorAll('.nav-link, .dropdown-item');
navLinks?.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close menu if clicking on the Services dropdown toggle
        const isDropdownToggle = link.closest('.nav-item.dropdown') && link.classList.contains('nav-link');

        if (!isDropdownToggle) {
            // Close menu for other links (home, about, contact) and dropdown items
            setTimeout(closeMobileMenu, 100);
        }
    });
});

// Close mobile menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('nav-open')) {
        closeMobileMenu();
    }
});
