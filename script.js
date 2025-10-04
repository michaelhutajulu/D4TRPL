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

        // Navigation
        function navigate(pageName, event) {
            event.preventDefault();
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageName).classList.add('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Close mobile menu
            document.getElementById('navMenu').classList.remove('active');
            document.getElementById('mobileToggle').classList.remove('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Reset mahasiswa view
            if (pageName === 'mahasiswa') {
                backToDosen();
            }
        }

        // Mobile menu toggle
        function toggleMobile() {
            const menu = document.getElementById('navMenu');
            const toggle = document.getElementById('mobileToggle');
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        }

        // Show students
        function showStudents(dosenId) {
            document.getElementById('dosenView').style.display = 'none';
            
            if (dosenId === 'dosen1') {
                document.getElementById('studentsList1').classList.add('active');
            } else {
                document.getElementById('studentsList2').classList.add('active');
            }
        }

        // Back to dosen
        function backToDosen() {
            document.getElementById('dosenView').style.display = 'block';
            document.getElementById('studentsList1').classList.remove('active');
            document.getElementById('studentsList2').classList.remove('active');
        }

        // Gallery drag scroll
        const galleryTrack = document.getElementById('galleryTrack');
        let isDown = false;
        let startX;
        let scrollLeft;

        if (galleryTrack) {
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
