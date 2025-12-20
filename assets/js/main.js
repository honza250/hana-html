/**
 * Main JavaScript Utilities
 * Shared functionality across all pages
 */

/**
 * Card Click Handlers
 * Make entire service cards clickable
 */
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', e => {
        if (!e.target.closest('.cta a')) {
            const url = card.dataset.href || card.querySelector('.btn-primary')?.href;
            if (url) window.location.href = url;
        }
    });
});

/**
 * Smooth Scroll Navigation
 * Handle anchor link smooth scrolling
 */
document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', '#' + id);
    }
});

/**
 * Date Display
 * Update current year and date
 */
const d = new Date();
const yearElement = document.getElementById('year');
const todayElement = document.getElementById('today');

if (yearElement) {
    yearElement.textContent = d.getFullYear();
}

if (todayElement) {
    todayElement.textContent = d.toLocaleDateString('cs-CZ');
}

/**
 * Form Input Styling
 * Apply consistent styling to form elements
 */
document.querySelectorAll('input, select, textarea').forEach(el => {
    el.style.width = '100%';
    el.style.padding = '10px 12px';
    el.style.marginTop = '6px';
    el.style.borderRadius = '12px';
    el.style.border = '1px solid color-mix(in oklab, var(--muted) 25%, transparent)';
    el.addEventListener('focus', () => el.style.boxShadow = `0 0 0 6px var(--ring)`);
    el.addEventListener('blur', () => el.style.boxShadow = 'none');
    el.style.background = 'var(--card)';
    el.style.color = 'var(--text)';
});

/**
 * Copy to Clipboard Function
 * @param {string} text - Text to copy
 * @param {HTMLElement} button - Button element that was clicked
 */
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 4px;"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Zkopírováno!';
        button.style.background = 'var(--brand)';
        button.style.color = 'white';
        button.style.borderColor = 'var(--brand)';
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = 'transparent';
            button.style.color = 'var(--brand)';
            button.style.borderColor = 'var(--brand)';
        }, 2000);
    }).catch(err => {
        console.error('Chyba při kopírování:', err);
        alert('Nepodařilo se zkopírovat do schránky');
    });
}

// Make copyToClipboard globally available
window.copyToClipboard = copyToClipboard;
