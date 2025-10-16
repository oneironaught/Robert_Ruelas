document.addEventListener('DOMContentLoaded', () => {
    // AOS Initialization
    AOS.init();

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            console.log('Dark mode toggle clicked');
            document.body.classList.toggle('dark-mode');
        });
    } else {
        console.warn('Dark mode toggle button not found in the DOM.');
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', topFunction);
    } else {
        console.warn('Back to top button not found in the DOM.');
    }

    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (backToTopBtn) {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        }
    }

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    }

    // Mobile Menu Toggle
    const menuButton = document.getElementById('menu-toggle');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    } else {
        console.warn('Menu toggle button not found in the DOM.');
    }

    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.toggle('open');
        } else {
            console.warn('Navigation links not found in the DOM.');
        }
    }

    // Modal Functionality
    function openModal(src, x, y) {
        const modal = document.getElementById('photoModal');
        const modalContent = document.querySelector('.modal-content');
        const enlargedPhoto = document.getElementById('enlargedPhoto');
        if (modal && modalContent && enlargedPhoto) {
            enlargedPhoto.src = src;
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modalContent.style.transformOrigin = `${x}px ${y}px`;
            modalContent.style.transform = 'scale(1)';
            setTimeout(() => {
                modal.classList.add('show');
                modalContent.classList.add('show');
            }, 10);
        } else {
            console.warn('Modal elements not found in the DOM.');
        }
    }

    function closeModal() {
        const modal = document.getElementById('photoModal');
        const modalContent = document.querySelector('.modal-content');
        if (modal && modalContent) {
            modalContent.classList.remove('show');
            setTimeout(() => {
                modal.style.opacity = '0';
                modal.style.display = 'none';
            }, 300);
        }
    }

    const photoContainers = document.querySelectorAll('.photo-container');
    photoContainers.forEach(container => {
        container.addEventListener('click', function (event) {
            if (event.target.tagName.toLowerCase() === 'a') {
                return; // Allow default link behavior
            }
            event.stopPropagation();
            const img = this.querySelector('img');
            if (img) {
                const imgSrc = img.src;
                const x = event.clientX;
                const y = event.clientY;
                openModal(imgSrc, x, y);
            }
        });
    });

    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.addEventListener('click', function (event) {
            const modalContent = document.querySelector('.modal-content');
            if (modalContent && !modalContent.contains(event.target) && event.target.tagName.toLowerCase() !== 'a') {
                closeModal();
            }
        });
    } else {
        console.warn('Photo modal not found in the DOM.');
    }

    // Accordion Functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const accordionItem = button.parentElement;
            accordionItem.classList.toggle('active');
            const content = accordionItem.querySelector('.accordion-content');
            if (content) {
                if (accordionItem.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            } else {
                console.warn('Accordion content not found for button:', button);
            }
        });
    });
});