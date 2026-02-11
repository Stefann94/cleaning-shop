// script.js
function initBurger() {
    const burger = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.onclick = () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('is-active');
        };
    } else {
        // Dacă nu a apărut încă, verifică din nou peste 50ms
        setTimeout(initBurger, 50);
    }
}
initBurger();