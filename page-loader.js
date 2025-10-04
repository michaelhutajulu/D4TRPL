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

// Update fungsi navigate
async function navigate(pageName, event) {
    event.preventDefault();
    
    await pageLoader.show(pageName);
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.getElementById('navMenu').classList.remove('active');
    document.getElementById('mobileToggle').classList.remove('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (pageName === 'mahasiswa') {
        backToDosen();
    }
}

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
}

// Load halaman pertama
document.addEventListener('DOMContentLoaded', async () => {
    await pageLoader.show('beranda');
});