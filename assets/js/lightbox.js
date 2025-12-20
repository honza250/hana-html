/**
 * Image Lightbox with Carousel Navigation
 * Click to zoom functionality with carousel support
 */

// Create lightbox overlay on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create lightbox HTML structure with navigation
    const lightboxHTML = `
        <div id="lightbox" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); z-index: 9999; cursor: zoom-out;">
            <button id="lightbox-close" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; font-size: 1.5rem; transition: all 0.3s ease; z-index: 10000; display: flex; align-items: center; justify-content: center;">✕</button>
            <button id="lightbox-prev" style="display: none; position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; font-size: 1.5rem; transition: all 0.3s ease; z-index: 10000; align-items: center; justify-content: center;">‹</button>
            <button id="lightbox-next" style="display: none; position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; font-size: 1.5rem; transition: all 0.3s ease; z-index: 10000; align-items: center; justify-content: center;">›</button>
            <img id="lightbox-img" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 95%; max-height: 95%; object-fit: contain; border-radius: 8px;">
            <div id="lightbox-counter" style="display: none; position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: white; font-size: 14px; background: rgba(0,0,0,0.5); padding: 8px 16px; border-radius: 20px;"></div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    // State for carousel mode
    let carouselImages = [];
    let currentCarouselIndex = 0;
    let isCarouselMode = false;

    // Function to open lightbox (single image mode)
    function openLightbox(imgSrc) {
        isCarouselMode = false;
        carouselImages = [];
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'block';
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
        lightboxCounter.style.display = 'none';
        document.body.style.overflow = 'hidden';
    }

    // Function to open lightbox in carousel mode
    function openLightboxCarousel(images, startIndex) {
        isCarouselMode = true;
        carouselImages = images;
        currentCarouselIndex = startIndex;
        updateLightboxImage();
        lightbox.style.display = 'block';
        lightboxPrev.style.display = 'flex';
        lightboxNext.style.display = 'flex';
        lightboxCounter.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Update lightbox image in carousel mode
    function updateLightboxImage() {
        if (isCarouselMode && carouselImages.length > 0) {
            lightboxImg.src = carouselImages[currentCarouselIndex];
            lightboxCounter.textContent = `${currentCarouselIndex + 1} / ${carouselImages.length}`;
        }
    }

    // Navigate to next image in carousel
    function nextImage() {
        if (isCarouselMode) {
            currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
            updateLightboxImage();
        }
    }

    // Navigate to previous image in carousel
    function prevImage() {
        if (isCarouselMode) {
            currentCarouselIndex = (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
            updateLightboxImage();
        }
    }

    // Function to close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        isCarouselMode = false;
        carouselImages = [];
    }

    // Add click handlers to close lightbox
    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox.addEventListener('click', closeLightbox);

    // Navigation buttons
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });

    // Close on Escape key, navigate with arrow keys
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft' && isCarouselMode) {
                prevImage();
            } else if (e.key === 'ArrowRight' && isCarouselMode) {
                nextImage();
            }
        }
    });

    // Add zoom cursor and click handler to all carousel images
    const addZoomToImages = (selector) => {
        const images = document.querySelectorAll(selector);
        const imageArray = Array.from(images).map(img => img.src);

        images.forEach((img, index) => {
            // Wrap image in container for icon overlay
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'flex';
            wrapper.style.minWidth = '100%';
            wrapper.style.height = '100%';
            wrapper.style.flexShrink = '0';

            // Create zoom icon overlay
            const zoomIcon = document.createElement('div');
            zoomIcon.innerHTML = `
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
            `;
            zoomIcon.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.6);
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 10;
            `;

            // Insert wrapper
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
            wrapper.appendChild(zoomIcon);

            // Ensure img also has min-width to prevent partial display
            img.style.minWidth = '100%';
            img.style.flexShrink = '0';

            // Show icon on hover
            wrapper.addEventListener('mouseenter', () => {
                zoomIcon.style.opacity = '1';
            });

            wrapper.addEventListener('mouseleave', () => {
                zoomIcon.style.opacity = '0';
            });

            // Add cursor and click handler
            wrapper.style.cursor = 'zoom-in';
            wrapper.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightboxCarousel(imageArray, index);
            });
        });
    };

    // Apply to certificate carousel images
    addZoomToImages('#cert-carousel img');

    // Apply to treatment carousel images
    addZoomToImages('#treatment-carousel img');

    // Add zoom to standalone images (simpler - no wrapper needed)
    const addZoomToStandaloneImages = (selector) => {
        const images = document.querySelectorAll(selector);
        images.forEach(img => {
            // Create zoom icon overlay
            const zoomIcon = document.createElement('div');
            zoomIcon.innerHTML = `
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
            `;
            zoomIcon.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.6);
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 10;
            `;

            // Make parent relative if not already
            const parent = img.parentElement;
            const parentPosition = window.getComputedStyle(parent).position;
            if (parentPosition === 'static') {
                parent.style.position = 'relative';
            }

            parent.appendChild(zoomIcon);

            // Show icon on hover
            parent.addEventListener('mouseenter', () => {
                zoomIcon.style.opacity = '1';
            });

            parent.addEventListener('mouseleave', () => {
                zoomIcon.style.opacity = '0';
            });

            // Add cursor and click handler to parent
            parent.style.cursor = 'zoom-in';
            parent.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(img.src);
            });
        });
    };

    // Apply to standalone images
    addZoomToStandaloneImages('img[src*="Loki.jpg"]');
    addZoomToStandaloneImages('img[src*="Hana.png"]');

    // Hover effects for buttons
    [lightboxClose, lightboxPrev, lightboxNext].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(255,255,255,0.3)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(255,255,255,0.2)';
        });
    });
});
