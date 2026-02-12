// search.js
function initSearch() {
    const searchInput = document.querySelector('#global-search');
    const resultsContainer = document.querySelector('#search-results');

    // Dacă elementele nu există încă (header-ul nu e gata), mai așteptăm 50ms
    if (!searchInput || !resultsContainer) {
        setTimeout(initSearch, 50);
        return;
    }

    console.log("Sistemul de search a fost inițializat!");

    searchInput.addEventListener('input', async (e) => {
        const term = e.target.value.trim();

        if (term.length < 2) {
            resultsContainer.classList.remove('active');
            resultsContainer.innerHTML = '';
            return;
        }

        try {
            const { data, error } = await window.supaClient
                .from('produse')
                .select('nume, imagine, categorie')
                .ilike('nume', `%${term}%`)
                .limit(5);

            if (error) throw error;
            renderResults(data, resultsContainer);
        } catch (err) {
            console.error("Eroare căutare Supabase:", err);
        }
    });

    // Închidem rezultatele la click în exterior
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.remove('active');
        }
    });
}

function renderResults(products, container) {
    if (products.length === 0) {
        container.innerHTML = '<div class="search-item">Niciun rezultat găsit</div>';
    } else {
        container.innerHTML = products.map(p => `
            <a href="/${p.categorie}/${p.categorie}.html" class="search-item">
                <img src="/pictures/${p.imagine}" alt="${p.nume}">
                <div class="search-item-info">
                    <h4>${p.nume}</h4>
                    <span>${p.categorie}</span>
                </div>
            </a>
        `).join('');
    }
    container.classList.add('active');
}

// Lansăm funcția
initSearch();