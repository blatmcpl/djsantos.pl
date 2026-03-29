document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
        }, 500);
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLogo = document.querySelector('.nav-logo');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');

            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                if (window.innerWidth <= 850) {
                    navLogo.style.opacity = '0';
                    navLogo.style.pointerEvents = 'none';
                }
            } else {
                document.body.style.overflow = '';
                navLogo.style.opacity = '1';
                navLogo.style.pointerEvents = 'all';
            }
        });
    }

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                    document.body.style.overflow = ''; 
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

    const products = [
        {
            title: "KOLEKCJA KUBKÓW SANTOS",
            desc: "Wysoka jakość i unikalny design. Nowy wzór już dostępny!",
            img: "img/kubki.png",
            link: "https://www.olx.pl/d/oferta/porcelanowy-kubek-santos-CID628-ID19rvcB.html"
        },
        {
            title: "KUBEK PORCELANOWY SANTOS GRAM BO LUBIĘ",
            desc: "Wysoka jakość i unikalny design. Nowy wzór już dostępny!",
            img: "img/kubki2.png",
            link: "https://www.olx.pl/d/oferta/kubek-porcelanowy-santos-z-motywem-gram-bo-lubie-CID628-ID19SCwO.html/"
        }
    ];

    let currentProduct = 0;

    const prodTitle = document.getElementById('product-title');
    const prodDesc = document.getElementById('product-desc');
    const prodImg = document.getElementById('shop-img');
    const prodBtn = document.getElementById('shop-buy-btn');
    const prevBtn = document.getElementById('prev-prod');
    const nextBtn = document.getElementById('next-prod');

    function updateProduct(index) {
        prodImg.style.opacity = '0';
        
        setTimeout(() => {
            prodTitle.textContent = products[index].title;
            prodDesc.textContent = products[index].desc;
            prodImg.src = products[index].img;
            prodBtn.href = products[index].link;
            prodImg.style.opacity = '1';
        }, 300);
    }

    if(prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentProduct--;
            if (currentProduct < 0) currentProduct = products.length - 1;
            updateProduct(currentProduct);
        });

        nextBtn.addEventListener('click', () => {
            currentProduct++;
            if (currentProduct >= products.length) currentProduct = 0;
            updateProduct(currentProduct);
        });
    }
});