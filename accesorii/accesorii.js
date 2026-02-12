const CATEGORIE_CURENTA = 'accesorii'; 

let isFetching = false;

async function fetchProducts() {
    if (isFetching) return;
    isFetching = true;

    const container = document.getElementById('products-container');
    const subtitle = document.querySelector('.subtitle-blue');
    
    if (!window.supaClient) {
        console.error('SupaClient not initialized.');
        isFetching = false;
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    let subcategorieURL = urlParams.get('sub');

    let query = window.supaClient
        .from('produse')
        .select('*')
        .eq('categorie', CATEGORIE_CURENTA);

    if (subcategorieURL) {
        query = query.eq('subcategorie', subcategorieURL.trim());
        if (subtitle) subtitle.innerText = subcategorieURL;
    }

    const { data: produse, error } = await query;

    if (error) {
        console.error('Fetch error:', error);
        container.innerHTML = '<p>Eroare la încărcarea accesoriilor.</p>';
        isFetching = false;
        return;
    }

    container.innerHTML = ''; 

    if (!produse || produse.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p>Momentan nu avem accesorii disponibile în această selecție.</p>
                <a href="accesorii.html" style="color: var(--main-blue); text-decoration: underline;">Vezi toate accesoriile</a>
            </div>`;
        isFetching = false;
        return;
    }

    produse.forEach(p => {
        const card = `
            <div class="product-card" id="produs-${p.id}">
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
    handleSearchNavigation();
}

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

document.addEventListener('DOMContentLoaded', fetchProducts);