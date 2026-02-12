let isFetching = false;

async function fetchProducts() {
    if (isFetching) return;
    isFetching = true;

    const container = document.getElementById('products-container');
    
    if (!window.supaClient) {
        console.error('SupaClient not initialized.');
        isFetching = false;
        return;
    }

    const { data: produse, error } = await window.supaClient
        .from('produse')
        .select('*')
        .eq('categorie', 'accesorii'); 

    if (error) {
        console.error('Fetch error:', error);
        container.innerHTML = '<p>Eroare la încărcarea accesoriilor.</p>';
        isFetching = false;
        return;
    }

    container.innerHTML = ''; 

    if (produse.length === 0) {
        container.innerHTML = '<p>Momentan nu avem accesorii disponibile.</p>';
        isFetching = false;
        return;
    }

    produse.forEach(p => {
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
                targetElement.style.outline = "3px solid #00a8ff";
                setTimeout(() => targetElement.style.outline = "none", 2500);
            }
        }, 600);
    }
}

document.addEventListener('DOMContentLoaded', fetchProducts);