// ATENȚIE: În baie.js pune 'baie', în bucatarie.js pune 'bucatarie', etc.
const CATEGORIE_CURENTA = 'baie'; 

let isFetching = false;

async function fetchProducts() {
    if (isFetching) return;
    isFetching = true;

    const container = document.getElementById('products-container');
    const subtitle = document.querySelector('.subtitle-blue');
    
    if (!window.supaClient) {
        console.error('supaClient nu este definit.');
        isFetching = false;
        return;
    }

    // 1. Extragem subcategoria din URL (?sub=...)
    const urlParams = new URLSearchParams(window.location.search);
    const subcategorieURL = urlParams.get('sub');

    // 2. Construim query-ul de bază pentru categoria paginii
    let query = window.supaClient
        .from('produse')
        .select('*')
        .eq('categorie', CATEGORIE_CURENTA);

    // 3. Dacă avem subcategorie în URL, filtrăm și după ea
    if (subcategorieURL) {
        query = query.eq('subcategorie', subcategorieURL);
        // Actualizăm subtitlul paginii ca să știe userul ce vede
        if (subtitle) subtitle.innerText = subcategorieURL;
    }

    const { data: produse, error } = await query;

    if (error) {
        console.error('Eroare la preluare:', error);
        container.innerHTML = '<p>Eroare la încărcarea produselor.</p>';
        isFetching = false;
        return;
    }

    container.innerHTML = ''; 

    if (!produse || produse.length === 0) {
        container.innerHTML = '<p>Nu s-au găsit produse în această selecție.</p>';
        isFetching = false;
        return;
    }

produse.forEach(p => {
    const card = `
        <div class="product-card" id="produs-${p.id}">
            ${p.este_nou ? '<div class="product-badge">Nou</div>' : ''}
            <div class="product-image">
                <a href="../produs.html?id=${p.id}">
                    <img src="../pictures/${p.imagine}" alt="${p.nume}">
                </a>
            </div>
            <div class="product-info">
                <a href="../produs.html?id=${p.id}" style="text-decoration: none; color: inherit;">
                    <h3>${p.nume}</h3>
                </a>
                <p class="price">${p.pret.toFixed(2)} RON</p>
                <button class="add-btn">Adaugă în coș</button>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', card);
});

    isFetching = false;
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