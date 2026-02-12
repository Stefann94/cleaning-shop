let isFetching = false;

async function fetchProducts() {
    if (isFetching) return;
    isFetching = true;

    const container = document.getElementById('products-container');
    
    if (!window.supaClient) {
        console.error('supaClient nu este definit. Verifică supabase-config.js');
        isFetching = false;
        return;
    }

    const { data: produse, error } = await window.supaClient
        .from('produse')
        .select('*')
        .eq('categorie', 'baie'); 

    if (error) {
        console.error('Eroare la preluare:', error);
        container.innerHTML = '<p>Eroare la încărcarea produselor.</p>';
        isFetching = false;
        return;
    }

    container.innerHTML = ''; 

    if (produse.length === 0) {
        container.innerHTML = '<p>Nu s-au găsit produse în această categorie.</p>';
        isFetching = false;
        return;
    }

    produse.forEach(p => {
        // Am adăugat id="produs-${p.id}" pentru a putea face scroll la el
        const card = `
            <div class="product-card" id="produs-${p.id}" data-category="${p.subcategorie || ''}">
                ${p.este_nou ? '<div class="product-badge">Nou</div>' : ''}
                <div class="product-image">
                    <img src="${p.imagine}" alt="${p.nume}">
                </div>
                <div class="product-info">
                    <h3>${p.nume}</h3>
                    <p class="price">${p.pret.toFixed(2)} RON</p>
                    <button class="add-btn">Adaugă în coș</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', card);
    });

    isFetching = false;

    // --- LOGICA PENTRU REDIRECȚIONARE DIN SEARCH ---
    handleSearchNavigation();
}

/**
 * Verifică dacă există un ID de produs în URL și face scroll la el
 */
function handleSearchNavigation() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Așteptăm un timp scurt pentru ca imaginile să se încarce parțial și layout-ul să fie gata
        setTimeout(() => {
            const targetElement = document.getElementById(`produs-${productId}`);
            if (targetElement) {
                // Scroll fin către element
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Adăugăm un efect vizual temporar (opțional)
                targetElement.style.transition = "all 0.5s ease";
                targetElement.style.outline = "3px solid #00a8ff";
                targetElement.style.boxShadow = "0 0 20px rgba(0, 168, 255, 0.4)";
                targetElement.style.transform = "scale(1.05)";

                // Revenim la normal după 2 secunde
                setTimeout(() => {
                    targetElement.style.outline = "none";
                    targetElement.style.boxShadow = "none";
                    targetElement.style.transform = "scale(1)";
                }, 2500);
            }
        }, 600);
    }
}

// Pornim încărcarea produselor
document.addEventListener('DOMContentLoaded', fetchProducts);