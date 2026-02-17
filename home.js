document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById('hero-slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideTimer; // Variabilă globală pentru cronometru

    function updateSlider(index) {
        // 1. Mutăm containerul
        slider.style.transform = `translateX(-${index * 25}%)`;
        
        // 2. Gestionăm clasele active pentru texte
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // 3. Update Dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;

        // --- LOGICA DE RESETARE TIMER ---
        resetTimer(); 
    }

    function resetTimer() {
        // Ștergem intervalul vechi
        clearInterval(slideTimer);
        
        // Pornim unul nou de 8 secunde
        slideTimer = setInterval(() => {
            let next = (currentSlide + 1) % slides.length;
            updateSlider(next);
        }, 8000);
    }

    // Inițializăm primul slide (pornind și timer-ul)
    updateSlider(0); 

    // Click pe dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            // Nu mai apelăm setInterval aici, updateSlider se ocupă de tot
            updateSlider(i);
        });
    });
});