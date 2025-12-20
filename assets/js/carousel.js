/**
 * Certificate Carousel
 * Only for index.html - certificate image carousel
 */

let currentSlide = 0;
const track = document.getElementById('cert-track');
const dots = document.querySelectorAll('.cert-dot');
const totalSlides = 5;

/**
 * Navigate to specific slide
 * @param {number} index - Slide index to navigate to
 */
function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
        dot.style.background = i === index ? 'var(--brand)' : 'var(--muted)';
    });
}

// Previous button
document.getElementById('cert-prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
});

// Next button
document.getElementById('cert-next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});
