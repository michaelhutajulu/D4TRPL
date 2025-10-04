// Create particle background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = Math.random() * 10 + 15 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
function toggleMobile() {
    const menu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileToggle');
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Improve accessibility and behavior for mobile toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');

    if (toggle) {
        // ensure button has proper aria attributes (index.html now uses button)
        toggle.setAttribute('aria-expanded', toggle.getAttribute('aria-expanded') || 'false');

        toggle.addEventListener('click', () => {
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            if (isActive) {
                // move focus to first menu link for keyboard users
                const firstLink = menu.querySelector('a');
                if (firstLink) firstLink.focus();
            } else {
                toggle.focus();
            }
        });

        // Close mobile menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    }

    // Delegate nav link clicks to a single handler (progressive enhancement)
    document.querySelectorAll('#navMenu a[data-page]').forEach(link => {
        link.addEventListener('click', (ev) => {
            // Let page-loader.js navigate handle the actual page switch
            ev.preventDefault();
            const pageName = link.dataset.page;

            // Update visual active state & aria-current
            document.querySelectorAll('#navMenu a').forEach(a => {
                a.classList.remove('active');
                a.removeAttribute('aria-current');
            });
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');

            // Close mobile menu if open
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                if (toggle) {
                    toggle.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }

            // Call global navigate (defined in page-loader.js)
            if (typeof navigate === 'function') navigate(pageName, ev);
        });
    });

    // On resize, ensure the mobile menu is closed if we move to desktop width
    window.addEventListener('resize', () => {
        const bp = 768; // must match CSS media query
        if (window.innerWidth > bp) {
            if (menu.classList.contains('active')) menu.classList.remove('active');
            if (toggle && toggle.classList.contains('active')) {
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// Show students (untuk halaman mahasiswa)
function showStudents(dosenId) {
    document.getElementById('dosenView').style.display = 'none';
    
    if (dosenId === 'dosen1') {
        document.getElementById('studentsList1').classList.add('active');
    } else {
        document.getElementById('studentsList2').classList.add('active');
    }
}

// Back to dosen (untuk halaman mahasiswa)
function backToDosen() {
    document.getElementById('dosenView').style.display = 'block';
    const list1 = document.getElementById('studentsList1');
    const list2 = document.getElementById('studentsList2');
    if (list1) list1.classList.remove('active');
    if (list2) list2.classList.remove('active');
}