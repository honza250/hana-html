/**
 * Contact Section Highlight
 * Highlights contact cards when navigating to #kontakt section
 */

// Function to highlight contact cards
function highlightContactCards() {
    const contactSection = document.getElementById('kontakt');
    if (!contactSection) return;

    const contactCards = contactSection.querySelectorAll('.card');

    // Add highlight animation to each card with delay
    contactCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('contact-highlight');

            // Remove class after animation completes
            setTimeout(() => {
                card.classList.remove('contact-highlight');
            }, 1500);
        }, index * 150); // Stagger animation for each card
    });
}

// Check if page loaded with #kontakt hash
if (window.location.hash === '#kontakt') {
    // Wait for page to be fully loaded and scrolled
    setTimeout(highlightContactCards, 500);
}

// Listen for hash changes (when clicking on "Kontaktovat" links)
window.addEventListener('hashchange', () => {
    if (window.location.hash === '#kontakt') {
        // Small delay to let scroll animation complete
        setTimeout(highlightContactCards, 300);
    }
});
