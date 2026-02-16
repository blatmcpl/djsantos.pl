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
    const navLogo = document.querySelector('.nav-logo'); // DODANO: Pobieranie logo

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Zmiana ikony z barów na X
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');

            // Zablokuj/odblokuj przewijanie strony i steruj widocznością logo
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                if (window.innerWidth <= 850) {
                    navLogo.style.opacity = '0'; // ZNIKANIE LOGO NA MOBILE
                    navLogo.style.pointerEvents = 'none';
                }
            } else {
                document.body.style.overflow = '';
                navLogo.style.opacity = '1'; // POWRÓT LOGO
                navLogo.style.pointerEvents = 'all';
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
                    document.body.style.overflow = ''; 
                    
                    // PRZYWRÓCENIE LOGO PO KLIKNIĘCIU W LINK
                    navLogo.style.opacity = '1';
                    navLogo.style.pointerEvents = 'all';
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