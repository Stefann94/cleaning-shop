const burger = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animație opțională pentru burger (se transformă în X)
    burger.classList.toggle('is-active');
});