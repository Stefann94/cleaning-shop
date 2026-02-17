// home.js

document.addEventListener("DOMContentLoaded", () => {
    // --- INITIALIZARE SLIDER HERO ---
    const slider = document.getElementById('hero-slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideTimer;

    function updateSlider(index) {
        if (!slider) return;
        
        // 1. Mutăm containerul
        slider.style.transform = `translateX(-${index * 25}%)`;
        
        // 2. Gestionăm clasele active
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // 3. Update Dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
        resetTimer(); 
    }

    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(() => {
            let next = (currentSlide + 1) % slides.length;
            updateSlider(next);
        }, 8000);
    }

    // Pornim slider-ul doar dacă există elementele pe pagină
    if (slider && slides.length > 0) {
        updateSlider(0); 
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => updateSlider(i));
        });
    }

    // --- LOGICA SUPABASE PENTRU OFERTE SPECIALE ---
    loadSpecialOffers();
});

/**
 * Încarcă produsele care au este_reducere = true din Supabase
 */
async function loadSpecialOffers() {
    // Așteptăm ca supaClient să fie definit (injectat global din supabase-config.js)
    if (!window.supaClient) {
        console.log("Se așteaptă conexiunea Supabase...");
        setTimeout(loadSpecialOffers, 100);
        return;
    }

    try {
        const { data: oferte, error } = await window.supaClient
            .from('produse')
            .select('*')
            .eq('este_reducere', true)
            .limit(4);

        if (error) throw error;

        renderOffers(oferte);
    } catch (err) {
        console.error('Eroare la preluarea ofertelor:', err.message);
        const container = document.getElementById('offers-container');
        if (container) container.innerHTML = "<p>Eroare la încărcarea produselor.</p>";
    }
}

/**
 * Randează HTML-ul pentru cardurile de oferte
 */
function renderOffers(produse) {
    const container = document.getElementById('offers-container');
    if (!container) return;

    if (!produse || produse.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Momentan nu sunt oferte speciale disponibile.</p>";
        return;
    }

    container.innerHTML = produse.map(p => {
        // Calculăm discount-ul
        const discount = p.pret_vechi ? Math.round(((p.pret_vechi - p.pret) / p.pret_vechi) * 100) : 0;
        
        // Gestionăm calea imaginii (dacă e din folderul pictures sau path complet)
        const imgSrc = p.imagine.includes('/') ? p.imagine : `pictures/${p.imagine}`;

        return `
            <div class="product-card sale" id="produs-${p.id}">
                ${discount > 0 ? `<div class="sale-badge">-${discount}%</div>` : ''}
                <div class="product-image">
                    <a href="produs.html?id=${p.id}">
                        <img src="${imgSrc}" alt="${p.nume}">
                    </a>
                </div>
                <div class="product-info">
                    <span class="brand-tag">${p.subcategorie || 'Top Product'}</span>
                    <a href="produs.html?id=${p.id}" style="text-decoration:none; color:inherit;">
                        <h3>${p.nume}</h3>
                    </a>
                    <div class="price-wrapper">
                        ${p.pret_vechi ? `<span class="old-price">${parseFloat(p.pret_vechi).toFixed(2)} lei</span>` : ''}
                        <span class="new-price">${parseFloat(p.pret).toFixed(2)} lei</span>
                    </div>
                    <button class="add-btn">Adaugă în Coș</button>
                </div>
            </div>
        `;
    }).join('');
}