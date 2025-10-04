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