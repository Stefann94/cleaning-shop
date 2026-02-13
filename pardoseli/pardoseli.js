// pardoseli/pardoseli.js

// 1. Setați categoria pentru a filtra produsele corect din Supabase
const CATEGORIE_CURENTA = 'pardoseli'; 

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

    // 2. Extragem subcategoria din URL (?sub=Detergent Parchet)
    const urlParams = new URLSearchParams(window.location.search);
    let subcategorieURL = urlParams.get('sub');

    // 3. Construim query-ul de bază
    let query = window.supaClient
        .from('produse')
        .select('*')
        .eq('categorie', CATEGORIE_CURENTA);

    // 4. Aplicăm filtrul de subcategorie dacă există în URL
    if (subcategorieURL) {
        // .trim() elimină spațiile accidentale sau caracterele ciudate
        query = query.eq('subcategorie', subcategorieURL.trim());
        
        // Actualizăm textul albastru de sub titlu cu numele filtrului ales
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
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p>Nu s-au găsit produse în această selecție.</p>
                <a href="pardoseli.html" style="color: var(--main-blue); text-decoration: underline;">Vezi toate produsele pentru pardoseli</a>
            </div>`;
        isFetching = false;
        return;
    }

    // 5. Generăm cardurile de produs
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
    
    // Rulăm logica de scroll dacă venim din Search
    handleSearchNavigation();
}

/**
 * Verifică dacă există un ID de produs în URL (din search) și face scroll la el
 */
function handleSearchNavigation() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        setTimeout(() => {
            const targetElement = document.getElementById(`produs-${productId}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                targetElement.style.transition = "all 0.5s ease";
                targetElement.style.outline = "3px solid #00a8ff";
                targetElement.style.boxShadow = "0 0 20px rgba(0, 168, 255, 0.4)";
                targetElement.style.transform = "scale(1.05)";

                setTimeout(() => {
                    targetElement.style.outline = "none";
                    targetElement.style.boxShadow = "none";
                    targetElement.style.transform = "scale(1)";
                }, 2500);
            }
        }, 600);
    }
}

// Inițializăm încărcarea la deschiderea paginii
document.addEventListener('DOMContentLoaded', fetchProducts);