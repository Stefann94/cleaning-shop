// script.js
function initBurger() {
    const burger = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('is-active');
        });
    }
}

// Așteptăm puțin să se genereze navbar-ul din componente.js
setTimeout(initBurger, 100);