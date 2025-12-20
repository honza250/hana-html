/**
 * Image Lightbox
 * Click to zoom functionality for carousel images
 */

// Create lightbox overlay on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create lightbox HTML structure
    const lightboxHTML = `
        <div id="lightbox" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); z-index: 9999; cursor: zoom-out;">
            <button id="lightbox-close" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; font-size: 1.5rem; transition: all 0.3s ease; z-index: 10000;">✕</button>
            <img id="lightbox-img" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 95%; max-height: 95%; object-fit: contain; border-radius: 8px;">
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Function to open lightbox
    function openLightbox(imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Add click handlers to close lightbox
    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox.addEventListener('click', closeLightbox);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });

    // Add zoom cursor and click handler to all carousel images
    const addZoomToImages = (selector) => {
        const images = document.querySelectorAll(selector);
        images.forEach(img => {
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
                openLightbox(img.src);
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

    // Hover effect for close button
    lightboxClose.addEventListener('mouseenter', () => {
        lightboxClose.style.background = 'rgba(255,255,255,0.3)';
    });

    lightboxClose.addEventListener('mouseleave', () => {
        lightboxClose.style.background = 'rgba(255,255,255,0.2)';
    });
});
