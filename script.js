document.addEventListener('DOMContentLoaded', () => {
    // Ukrywanie preloadera po załadowaniu okna
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
        }, 500);
    });

    // --- LOGIKA MENU MOBILNEGO ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Zmiana ikony z barów na X
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');

            // Zablokuj/odblokuj przewijanie strony, gdy otwarte jest menu na cały ekran
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Płynne przewijanie do sekcji
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Zamykanie menu mobilnego po kliknięciu w link
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                    document.body.style.overflow = ''; // Odblokuj przewijanie
                }

                const navHeight = document.querySelector('nav').offsetHeight;
                const offsetTop = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efekt zmiany tła nawigacji przy skrolowaniu (tylko dla komputerów)
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 850) {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        }
    });
});