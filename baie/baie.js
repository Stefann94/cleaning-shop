async function fetchProducts() {
    const container = document.getElementById('products-container');
    
    // Verificăm dacă clientul Supabase există
    if (!window.supaClient) {
        console.error('supaClient nu este definit. Verifică supabase-config.js');
        return;
    }

    const { data: produse, error } = await window.supaClient
        .from('produse')
        .select('*')
        .eq('categorie', 'baie'); 

    if (error) {
        console.error('Eroare la preluare:', error);
        container.innerHTML = '<p>Eroare la încărcarea produselor.</p>';
        return;
    }

    // Curățăm containerul
    container.innerHTML = ''; 

    if (produse.length === 0) {
        container.innerHTML = '<p>Nu s-au găsit produse în această categorie.</p>';
        return;
    }

    produse.forEach(p => {
        const card = `
            <div class="product-card" data-category="${p.subcategorie || ''}">
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
}

document.addEventListener('DOMContentLoaded', fetchProducts);