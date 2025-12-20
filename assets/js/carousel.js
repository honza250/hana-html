/**
 * Carousel functionality
 * Supports both certificate carousel (index.html) and treatment carousel (osetreni-koni.html)
 */

// Certificate Carousel (index.html)
const certTrack = document.getElementById('cert-track');
const certDots = document.querySelectorAll('.cert-dot');
const certPrevBtn = document.getElementById('cert-prev');
const certNextBtn = document.getElementById('cert-next');

if (certTrack && certDots.length > 0) {
    let certCurrentSlide = 0;
    const certTotalSlides = certDots.length;

    function goToCertSlide(index) {
        certCurrentSlide = index;
        certTrack.style.transform = `translateX(-${index * 100}%)`;

        certDots.forEach((dot, i) => {
            dot.style.background = i === index ? 'var(--brand)' : 'var(--muted)';
        });
    }

    certPrevBtn?.addEventListener('click', () => {
        certCurrentSlide = (certCurrentSlide - 1 + certTotalSlides) % certTotalSlides;
        goToCertSlide(certCurrentSlide);
    });

    certNextBtn?.addEventListener('click', () => {
        certCurrentSlide = (certCurrentSlide + 1) % certTotalSlides;
        goToCertSlide(certCurrentSlide);
    });

    certDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToCertSlide(index);
        });
    });
}

// Treatment Carousel (osetreni-koni.html)
const treatmentTrack = document.getElementById('treatment-track');
const treatmentDots = document.querySelectorAll('.treatment-dot');
const treatmentPrevBtn = document.getElementById('treatment-prev');
const treatmentNextBtn = document.getElementById('treatment-next');

if (treatmentTrack && treatmentDots.length > 0) {
    let treatmentCurrentSlide = 0;
    const treatmentTotalSlides = treatmentDots.length;

    function goToTreatmentSlide(index) {
        treatmentCurrentSlide = index;
        treatmentTrack.style.transform = `translateX(-${index * 100}%)`;

        treatmentDots.forEach((dot, i) => {
            dot.style.background = i === index ? 'var(--brand)' : 'var(--muted)';
        });
    }

    treatmentPrevBtn?.addEventListener('click', () => {
        treatmentCurrentSlide = (treatmentCurrentSlide - 1 + treatmentTotalSlides) % treatmentTotalSlides;
        goToTreatmentSlide(treatmentCurrentSlide);
    });

    treatmentNextBtn?.addEventListener('click', () => {
        treatmentCurrentSlide = (treatmentCurrentSlide + 1) % treatmentTotalSlides;
        goToTreatmentSlide(treatmentCurrentSlide);
    });

    treatmentDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToTreatmentSlide(index);
        });
    });
}
