let isFetching = false;

async function fetchProducts() {
    if (isFetching) return;
    isFetching = true;

    const container = document.getElementById('products-container');
    
    // Verificăm dacă clientul Supabase este disponibil
    if (!window.supaClient) {
        console.error('supaClient nu este definit. Verifică supabase-config.js');
        isFetching = false;
        return;
    }

    // Preluăm produsele filtrând strict după categoria 'bucatarie'
    const { data: produse, error } = await window.supaClient
        .from('produse')
        .select('*')
        .eq('categorie', 'bucatarie'); 

    if (error) {
        console.error('Eroare la preluare:', error);
        container.innerHTML = '<p>Eroare la încărcarea produselor.</p>';
        isFetching = false;
        return;
    }

    // Curățăm mesajul de "Încărcare"
    container.innerHTML = ''; 

    if (produse.length === 0) {
        container.innerHTML = '<p>Nu s-au găsit produse în această categorie.</p>';
        isFetching = false;
        return;
    }

    // Generăm cardurile de produs
    produse.forEach(p => {
        const card = `
            <div class="product-card" id="produs-${p.id}" data-category="${p.subcategorie || ''}">
                ${p.este_nou ? '<div class="product-badge">Nou</div>' : ''}
                <div class="product-image">
                    <img src="../pictures/${p.imagine}" alt="${p.nume}">
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

    // Activăm logica de scroll dacă utilizatorul vine din Search
    handleSearchNavigation();
}

/**
 * Verifică dacă există un ID de produs în URL (venit din Search) și face scroll la el
 */
function handleSearchNavigation() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        setTimeout(() => {
            const targetElement = document.getElementById(`produs-${productId}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Efect de evidențiere (highlight)
                targetElement.style.transition = "all 0.5s ease";
                targetElement.style.outline = "3px solid #00a8ff";
                targetElement.style.boxShadow = "0 0 20px rgba(0, 168, 255, 0.4)";
                targetElement.style.transform = "scale(1.02)";

                setTimeout(() => {
                    targetElement.style.outline = "none";
                    targetElement.style.boxShadow = "none";
                    targetElement.style.transform = "scale(1)";
                }, 2500);
            }
        }, 600);
    }
}

// Inițializăm încărcarea
document.addEventListener('DOMContentLoaded', fetchProducts);