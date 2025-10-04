// page-loader.js
// Load konten HTML dari file terpisah

const pageLoader = {
    pages: {
        'beranda': 'pages/beranda.html',
        'profil': 'pages/profil.html',
        'mahasiswa': 'pages/mahasiswa.html',
        'kontak': 'pages/kontak.html'
    },
    cache: {},

    async load(pageName) {
        if (this.cache[pageName]) {
            return this.cache[pageName];
        }

        try {
            const response = await fetch(this.pages[pageName]);
            if (!response.ok) throw new Error('Page not found');
            const html = await response.text();
            this.cache[pageName] = html;
            return html;
        } catch (error) {
            console.error('Error:', error);
            return '<div class="container"><h2>Error loading page</h2></div>';
        }
    },

    async show(pageName) {
        const container = document.getElementById(pageName);
        
        if (!container.hasAttribute('data-loaded')) {
            const content = await this.load(pageName);
            container.innerHTML = content;
            container.setAttribute('data-loaded', 'true');
            
            // Re-init gallery untuk beranda
            if (pageName === 'beranda') {
                initGallery();
            }
        }

        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        container.classList.add('active');
    }
};

// Update fungsi navigate (robust + accessible)
async function navigate(pageName, event) {
    // event optional (we sometimes call navigate programmatically)
    if (event && typeof event.preventDefault === 'function') event.preventDefault();

    // Load the page content
    await pageLoader.show(pageName);

    // Update nav active states in a robust manner
    try {
        const navLinks = document.querySelectorAll('#navMenu a[data-page]');
        navLinks.forEach(l => {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
        });
        const activeLink = document.querySelector(`#navMenu a[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    } catch (e) {
        // defensive: ignore
        console.warn('Could not update nav active state', e);
    }

    // Close mobile menu if open and keep ARIA attributes in sync
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    if (navMenu && navMenu.classList.contains('active')) navMenu.classList.remove('active');
    if (mobileToggle) {
        mobileToggle.classList.remove('active');
        // if it is a button, update aria-expanded
        try { mobileToggle.setAttribute('aria-expanded', 'false'); } catch (e) {}
    }

    // Update URL (push hash) so back/forward works and deep links possible
    try {
        const url = `#${pageName}`;
        if (window.location.hash !== url) {
            history.pushState({ page: pageName }, '', url);
        }
    } catch (e) { /* ignore */ }

    // Move focus to the newly activated page container for accessibility
    try {
        const container = document.getElementById(pageName);
        if (container) {
            if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '-1');
            container.focus({ preventScroll: true });
        }
    } catch (e) { /* ignore */ }

    // Smooth scroll to top of page main content
    try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { /* ignore */ }

    if (pageName === 'mahasiswa') {
        backToDosen();
    }
}

// Initialize based on location.hash if present
document.addEventListener('DOMContentLoaded', async () => {
    const hash = (window.location.hash || '').replace('#', '');
    if (hash && Object.prototype.hasOwnProperty.call(pageLoader.pages, hash)) {
        await pageLoader.show(hash);
    } else {
        await pageLoader.show('beranda');
    }
});

// Init gallery drag untuk beranda
function initGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    if (!galleryTrack) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        galleryTrack.style.cursor = 'grabbing';
        startX = e.pageX - galleryTrack.offsetLeft;
        scrollLeft = galleryTrack.scrollLeft;
    });

    galleryTrack.addEventListener('mouseleave', () => {
        isDown = false;
        galleryTrack.style.cursor = 'grab';
    });

    galleryTrack.addEventListener('mouseup', () => {
        isDown = false;
        galleryTrack.style.cursor = 'grab';
    });

    galleryTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galleryTrack.offsetLeft;
        const walk = (x - startX) * 2;
        galleryTrack.scrollLeft = scrollLeft - walk;
    });

    // Touch drag support for mobile devices
    galleryTrack.addEventListener('touchstart', (e) => {
        // Pause auto-scroll handled elsewhere; also start dragging
        isDown = true;
        const touch = e.touches[0];
        startX = touch.pageX - galleryTrack.offsetLeft;
        scrollLeft = galleryTrack.scrollLeft;
    }, { passive: true });

    galleryTrack.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        // allow preventing default to avoid page scroll while swiping gallery
        e.preventDefault?.();
        const touch = e.touches[0];
        const x = touch.pageX - galleryTrack.offsetLeft;
        const walk = (x - startX) * 2;
        galleryTrack.scrollLeft = scrollLeft - walk;
    }, { passive: false });

    galleryTrack.addEventListener('touchend', () => {
        isDown = false;
    });

    galleryTrack.addEventListener('touchcancel', () => {
        isDown = false;
    });

    // Automatic smooth horizontal auto-scroll
    // Uses requestAnimationFrame for smoothness and pauses on user interaction
    (function setupAutoScroll(track) {
        // Respect reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery && mediaQuery.matches) return;

        let rafId = null;
        let speed = 0.25; // pixels per frame (tweakable)
        let direction = 1; // 1 => scroll right, -1 => scroll left
        let isPaused = false;
        let lastInteraction = 0;
        const PAUSE_AFTER_MS = 3000; // resume after this time of inactivity

        function step() {
            if (!isPaused) {
                // If the content doesn't overflow, don't attempt to scroll
                if (track.scrollWidth > track.clientWidth + 2) {
                    track.scrollLeft += speed * direction;

                    // Reverse direction at the ends with a small bounce
                    if (track.scrollLeft <= 0) {
                        direction = 1;
                    } else if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth) {
                        direction = -1;
                    }
                }
            }
            rafId = window.requestAnimationFrame(step);
        }

        function pause(reason) {
            isPaused = true;
            lastInteraction = Date.now();
            // keep rAF running but not scrolling so we can auto-resume
        }

        function maybeResume() {
            if (!isPaused) return;
            if (Date.now() - lastInteraction > PAUSE_AFTER_MS) {
                isPaused = false;
            }
        }

        // User interactions that should pause the auto-scroll
        ['mouseenter', 'mousedown', 'touchstart', 'wheel', 'focusin'].forEach(evt => {
            track.addEventListener(evt, pause, { passive: true });
        });

        // Resume when user stops interacting
        ['mouseleave', 'mouseup', 'touchend'].forEach(evt => {
            track.addEventListener(evt, () => {
                lastInteraction = Date.now();
                // schedule a check to resume after PAUSE_AFTER_MS
                setTimeout(maybeResume, PAUSE_AFTER_MS + 50);
            });
        });

        // If user starts dragging via the existing mousedown flow, ensure pause
        // (the mousedown handler above already toggles isDown; we also pause here)
        track.addEventListener('mousedown', pause, { passive: true });
        track.addEventListener('touchstart', pause, { passive: true });

        // Start the loop
        rafId = window.requestAnimationFrame(step);

        // Expose a way to stop (not strictly needed but tidy)
        track._stopAutoScroll = function () {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;
        };
    })(galleryTrack);
}

// Load halaman pertama
document.addEventListener('DOMContentLoaded', async () => {
    await pageLoader.show('beranda');
});