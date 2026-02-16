// componente.js
document.addEventListener("DOMContentLoaded", () => {
    // Detectăm dacă suntem într-un subfolder pentru a ajusta căile (../)
    const isSubpage = window.location.pathname.includes('/') && 
                     !window.location.pathname.endsWith('index.html') && 
                     window.location.pathname.split('/').length > 2;
    
    const pathPrefix = isSubpage ? "../" : "";

    // --- ACTIVARE PAGINA PRODUS (DOAR DACĂ EXISTĂ ELEMENTUL PE PAGINĂ) ---
    const productContainer = document.getElementById('product-main-content');
        if (productContainer) {
            initProductPageLogic(pathPrefix);
}

    const headerHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <div class="burger-menu" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>

            <div class="logo">
                <a href="${pathPrefix}index.html">CLEAN<span>SHOP</span></a>
            </div>

            <ul class="nav-links">
                <li><a href="${pathPrefix}index.html">Home</a></li>
                
            <li class="has-dropdown">
                <a href="${pathPrefix}baie/baie.html">Baie <img src="${pathPrefix}pictures/baie_btn.png" class="nav-icon" alt=""></a>
                <ul class="dropdown">
                    <div class="dropdown-content">
                        <div class="dropdown-links">
                            <li><a href="${pathPrefix}baie/baie.html?sub=Detergenți WC">Detergenți WC</a></li>
                            <li><a href="${pathPrefix}baie/baie.html?sub=Anticalcar">Anticalcar</a></li>
                            <li><a href="${pathPrefix}baie/baie.html?sub=Odorizante">Odorizante</a></li>
                        </div>
                        <div class="dropdown-image">
                            <img src="${pathPrefix}pictures/prezentarebaie.png" alt="Baie">
                        </div>
                    </div>
                </ul>
            </li>

            <li class="has-dropdown">
                <a href="${pathPrefix}bucatarie/bucatarie.html">Bucătărie <img src="${pathPrefix}pictures/bucatarie_btn.png" class="nav-icon" alt=""></a>
                <ul class="dropdown">
                    <div class="dropdown-content">
                        <div class="dropdown-links">
                            <li><a href="${pathPrefix}bucatarie/bucatarie.html?sub=Degresanți">Degresanți</a></li>
                            <li><a href="${pathPrefix}bucatarie/bucatarie.html?sub=Detergenți Vase">Detergenți Vase</a></li>
                            <li><a href="${pathPrefix}bucatarie/bucatarie.html?sub=Curățare Cuptor">Curățare Cuptor</a></li>
                        </div>
                        <div class="dropdown-image">
                            <img src="${pathPrefix}pictures/prezentarebucatarie.png" alt="Bucătărie">
                        </div>
                    </div>
                </ul>
            </li>

            <li class="has-dropdown">
                <a href="${pathPrefix}pardoseli/pardoseli.html">Pardoseli <img src="${pathPrefix}pictures/pardoseli.png" class="nav-icon" alt=""></a>
                <ul class="dropdown">
                    <div class="dropdown-content">
                        <div class="dropdown-links">
                            <li><a href="${pathPrefix}pardoseli/pardoseli.html?sub=Detergent Parchet">Detergent Parchet</a></li>
                            <li><a href="${pathPrefix}pardoseli/pardoseli.html?sub=Soluții Gresie">Soluții Gresie</a></li>
                            <li><a href="${pathPrefix}pardoseli/pardoseli.html?sub=Mopuri %26 Găleți">Mopuri & Găleți</a></li>
                        </div>
                        <div class="dropdown-image">
                            <img src="${pathPrefix}pictures/prezentarepardoseli.png" alt="Pardoseli">
                        </div>
                    </div>
                </ul>
            </li>

            <li class="has-dropdown">
                <a href="${pathPrefix}rufe/rufe.html">Rufe <img src="${pathPrefix}pictures/rufe.png" class="nav-icon" alt=""></a>
                <ul class="dropdown">
                    <div class="dropdown-content">
                        <div class="dropdown-links">
                            <li><a href="${pathPrefix}rufe/rufe.html?sub=Detergent Lichid">Detergent Lichid</a></li>
                            <li><a href="${pathPrefix}rufe/rufe.html?sub=Balsam Rufe">Balsam Rufe</a></li>
                            <li><a href="${pathPrefix}rufe/rufe.html?sub=Îndepărtare Pete">Îndepărtare Pete</a></li>
                        </div>
                        <div class="dropdown-image">
                            <img src="${pathPrefix}pictures/prezentarerufe.png" alt="Rufe">
                        </div>
                    </div>
                </ul>
            </li>

            <li class="has-dropdown">
                <a href="${pathPrefix}igiena/igiena.html">Igienă <img src="${pathPrefix}pictures/igiena_btn.png" class="nav-icon" alt=""></a>
                <ul class="dropdown">
                    <div class="dropdown-content">
                        <div class="dropdown-links">
                            <li><a href="${pathPrefix}igiena/igiena.html?sub=Săpun Lichid">Săpun Lichid</a></li>
                            <li><a href="${pathPrefix}igiena/igiena.html?sub=Dezinfectanți Mâini">Dezinfectanți Mâini</a></li>
                            <li><a href="${pathPrefix}igiena/igiena.html?sub=Gel de Duș">Gel de Duș</a></li>
                        </div>
                        <div class="dropdown-image">
                            <img src="${pathPrefix}pictures/prezentareigiena.png" alt="Igienă">
                        </div>
                    </div>
                </ul>
            </li>

            <li class="has-dropdown">
                <a href="${pathPrefix}accesorii/accesorii.html">Accesorii <img src="${pathPrefix}pictures/accesorii.png" class="nav-icon" alt=""></a>
                <ul class="dropdown">
                    <div class="dropdown-content">
                        <div class="dropdown-links">
                            <li><a href="${pathPrefix}accesorii/accesorii.html?sub=Lavete %26 Bureți">Lavete & Bureți</a></li>
                            <li><a href="${pathPrefix}accesorii/accesorii.html?sub=Mănuși Protecție">Mănuși Protecție</a></li>
                            <li><a href="${pathPrefix}accesorii/accesorii.html?sub=Perii Curățenie">Perii Curățenie</a></li>
                        </div>
                        <div class="dropdown-image">
                            <img src="${pathPrefix}pictures/prezentareaccesorii.png" alt="Accesorii">
                        </div>
                    </div>
                </ul>
            </li>

                <li><a href="${pathPrefix}contact/contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>

    <div class="topbar">
        <div class="topbar-container">
            <div class="top-search">
                <input type="text" id="global-search" placeholder="Caută produse">
                <button class="search-btn">
                    <img src="/pictures/search-icon.png" alt="Search">
                </button>
                <div id="search-results" class="search-results-container"></div>
            </div>

            <div class="topbar-items">
                <div class="top-item">
                    <img src="${pathPrefix}pictures/phone-icon.png" class="top-icon" alt="">
                    <span>Comenzi telefonice la 07xx xxx xxx</span>
                </div>
                <div class="top-item">
                    <img src="${pathPrefix}pictures/pin-icon.png" class="top-icon" alt="">
                    <span>Locație: București</span>
                </div>
<div class="top-auth">
    </div>
            </div>
        </div>
    </div>
    `;



const widgetsHTML = `
<div class="fixed-widgets">
    <div class="cos-widget" id="deschide-cos">
        <img src="${pathPrefix}pictures/cos.png" alt="Cos">
        <span id="cart-count-text">Coș (0)</span>
    </div>

    <div id="cos-popup" class="cos-popup">
        <div class="cos-popup-header">
            <h3>Coșul tău</h3>
            <button id="inchide-cos">&times;</button>
        </div>
        <div id="cos-produse-lista" class="cos-popup-produse">
            </div>
        <div class="cos-popup-footer">
            <div class="cos-total-row">
                <span>Total:</span>
                <span id="cos-total-suma">0.00 RON</span>
            </div>
            <button onclick="window.location.href='${pathPrefix}checkout.html'" class="finalizeaza-btn">Finalizează Comanda</button>
        </div>
    </div>

    <button id="gotoTop" class="top-widget">
        <img src="${pathPrefix}pictures/gotop.png" alt="Top">
    </button>
</div>
`;

    // Inserăm Navbar/Topbar
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
    
    // Inserăm butoanele în dreapta jos
    document.body.insertAdjacentHTML("beforeend", widgetsHTML);

    // Logică pentru butonul Go To Top
    const topBtn = document.querySelector('#gotoTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

// Re-atașăm logica de burger menu
    const burger = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        // Folosim onclick pentru a suprascrie orice altă tentativă de legătură
        burger.onclick = () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('is-active');
            console.log("Meniu activat!");
        };
    }
});

// --- LOGICA SEARCH OPTIMIZATĂ ---
// --- LOGICA SEARCH REPARATĂ (RPC + DIACRITICE) ---
const startSearchLogic = () => {
    const searchInput = document.querySelector('#global-search');
    const resultsContainer = document.querySelector('#search-results');

    if (!searchInput || !resultsContainer) {
        setTimeout(startSearchLogic, 100);
        return;
    }

    const isSubpage = window.location.pathname.includes('/') && 
                      !window.location.pathname.endsWith('index.html') && 
                      window.location.pathname.split('/').length > 2;
    const pathPrefix = isSubpage ? "../" : "";

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim();
        clearTimeout(debounceTimer);

        if (term.length < 2) {
            resultsContainer.classList.remove('active');
            resultsContainer.innerHTML = '';
            return;
        }

        debounceTimer = setTimeout(async () => {
            if (!window.supaClient) return;

            // Apelăm funcția RPC creată în Pasul 1
            const { data, error } = await window.supaClient
                .rpc('cauta_produse_fara_diacritice', { termen_cautat: term });

            if (error) {
                console.error("Eroare la căutare:", error);
                return;
            }

            if (data && data.length > 0) {
                resultsContainer.innerHTML = data.map(p => `
                    <a href="${pathPrefix}${p.categorie}/${p.categorie}.html?id=${p.id}#produs-${p.id}" class="search-item">
                        <img src="${pathPrefix}pictures/${p.imagine}" alt="${p.nume}">
                        <div class="search-item-info">
                            <h4>${p.nume}</h4>
                            <span>${p.categorie}</span>
                        </div>
                    </a>
                `).join('');
            } else {
                resultsContainer.innerHTML = '<div class="search-item">Niciun produs găsit</div>';
            }
            
            resultsContainer.classList.add('active');
        }, 300);
    });

    // Închide la click în afară
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.remove('active');
        }
    });
};

// Pornim logica
startSearchLogic();

// --- LOGICA PENTRU AFIȘARE NUME UTILIZATOR / LOGIN ---
const initAuthObserver = () => {
    if (!window.supaClient) {
        setTimeout(initAuthObserver, 100);
        return;
    }

    window.supaClient.auth.onAuthStateChange((event, session) => {
        const authContainer = document.querySelector('.top-auth');
        if (!authContainer) return;

        if (session) {
            const user = session.user;
            const userName = user.user_metadata.full_name || user.email.split('@')[0];

            authContainer.innerHTML = `
                <div class="user-logged-wrapper">
                    <span class="user-welcome">Salut, <strong>${userName}</strong></span>
                    <button id="logout-link" class="logout-btn">Ieșire</button>
                </div>
            `;

            document.getElementById('logout-link').onclick = async (e) => {
                e.preventDefault();
                await window.supaClient.auth.signOut();
                window.location.reload();
            };
        } else {
            authContainer.innerHTML = `
                <a href="/login/login.html" class="auth-link login">Log In</a>
                <span class="auth-divider"></span>
                <a href="/login/login.html" class="auth-link signup">Sign Up</a>
            `;
        }
    });
};

initAuthObserver();


// --- LOGICA GLOBALĂ PENTRU COȘ ---

// 1. Funcție pentru a lua produsele din LocalStorage
window.getCart = () => JSON.parse(localStorage.getItem('cart')) || [];

// 2. Funcție pentru a salva produsele
window.saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.renderCart(); // Actualizăm vizual popup-ul peste tot
};

// 3. Funcția de randare vizuală a popup-ului
window.renderCart = () => {
    const cart = window.getCart();
    const listaProduse = document.getElementById('cos-produse-lista');
    const totalSuma = document.getElementById('cos-total-suma');
    const cartCountText = document.getElementById('cart-count-text');

    if (!listaProduse) return;

    if (cart.length === 0) {
        listaProduse.innerHTML = '<p style="text-align:center; padding:1rem;">Coșul este gol.</p>';
        totalSuma.innerText = '0.00 RON';
        cartCountText.innerText = 'Coș (0)';
        return;
    }

    let total = 0;
    listaProduse.innerHTML = cart.map((item, index) => {
        total += item.pret * item.cantitate;
        return `
            <div class="search-item" style="justify-content: space-between;">
                <div style="display:flex; gap:10px; align-items:center;">
                    <img src="${item.imagine}" style="width:40px; height:40px; border-radius:5px;">
                    <div>
                        <h4 style="font-size:0.8rem; margin:0;">${item.nume}</h4>
                        <small>${item.cantitate} x ${item.pret} RON</small>
                    </div>
                </div>
                <button onclick="window.removeFromCart(event, ${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold; padding: 5px;">X</button>
            </div>
        `;
    }).join('');

    totalSuma.innerText = `${total.toFixed(2)} RON`;
    cartCountText.innerText = `Coș (${cart.reduce((acc, item) => acc + item.cantitate, 0)})`;
};

// 4. Funcție de eliminare
window.removeFromCart = (index) => {
    if (event) event.stopPropagation();
    const cart = window.getCart();
    cart.splice(index, 1);
    window.saveCart(cart);
    document.getElementById('cos-popup').classList.add('active');
};

// 5. Evenimente de deschidere/închidere (trebuie puse după ce HTML-ul e injectat)
document.addEventListener('click', (e) => {
    const popup = document.getElementById('cos-popup');
    const btnDeschide = document.getElementById('deschide-cos');
    const btnInchide = document.getElementById('inchide-cos');

    if (btnDeschide && btnDeschide.contains(e.target)) {
        popup.classList.toggle('active');
        window.renderCart();
    } else if (btnInchide && btnInchide.contains(e.target)) {
        popup.classList.remove('active');
    } else if (popup && !popup.contains(e.target) && !btnDeschide.contains(e.target)) {
        popup.classList.remove('active');
    }
});

// Inițializare la load
setTimeout(window.renderCart, 500);



// --- LOGICA GLOBALĂ: ASCULTĂTOR PENTRU ORICE BUTON "ADĂUGĂ ÎN COȘ" ---
document.addEventListener('click', async (e) => {
    // Verificăm dacă elementul apăsat este un buton de adăugare
    if (e.target.classList.contains('add-btn')) {
        const buton = e.target;
        // Căutăm cel mai apropiat card de produs pentru a-i lua datele
            const card = buton.closest('.product-card') || buton.closest('.product-info-details');
        
        if (!card) return;

        // Extragem ID-ul din string-ul "produs-123"
        const produsId = card.id.replace('produs-', '');
        
        // Luăm datele direct din DOM (sau am putea face un fetch rapid)
        const nume = card.querySelector('h3').innerText;
        const pretText = card.querySelector('.price').innerText;
        const pret = parseFloat(pretText.replace(' RON', ''));
        const imagineFull = card.querySelector('img').src;

        // Pregătim obiectul
        let cart = window.getCart();
        const existent = cart.find(item => item.id === produsId);

        if (existent) {
            existent.cantitate += 1;
        } else {
            cart.push({
                id: produsId,
                nume: nume,
                pret: pret,
                imagine: imagineFull, // Salvăm calea completă pentru a nu avea erori de folder
                cantitate: 1
            });
        }

        window.saveCart(cart);
        
        // Feedback vizual: Deschidem popup-ul
        const popup = document.getElementById('cos-popup');
        if (popup) popup.classList.add('active');

        // Animație temporară pe buton pentru confirmare
        const textOriginal = buton.innerText;
        buton.innerText = "Adăugat! ✓";
        buton.style.background = "#2ecc71";
        setTimeout(() => {
            buton.innerText = textOriginal;
            buton.style.background = "";
        }, 1500);
    }
});



// --- LOGICA PAGINA PRODUS (SABLON DINAMIC) ---
async function initProductPageLogic(pathPrefix) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (!productId) return;

    // Fetch Date Produs din Supabase
    const { data: produs, error } = await window.supaClient
        .from('produse')
        .select('*')
        .eq('id', productId)
        .single();

    if (error || !produs) {
        document.getElementById('product-main-content').innerHTML = "<p>Produsul nu a fost găsit.</p>";
        return;
    }

    // Randare Continut Produs
document.getElementById('product-main-content').innerHTML = `
    <div class="product-gallery">
        <img src="${produs.imagine.startsWith('..') ? produs.imagine : pathPrefix + 'pictures/' + produs.imagine}" alt="${produs.nume}">
    </div>

    <div class="product-shipping-info">
        <div class="info-card">
            <img src="${pathPrefix}pictures/truck-icon.png" alt="" class="info-icon">
            <div>
                <p class="info-title">Livrare Rapidă</p>
                <p class="info-text">Estimare: 24h - 48h</p>
            </div>
        </div>
        <div class="info-card">
            <img src="${pathPrefix}pictures/box-icon.png" alt="" class="info-icon">
            <div>
                <p class="info-title">Deschidere Colet</p>
                <p class="info-text">Verifici înainte să plătești</p>
            </div>
        </div>
        <div class="info-card">
            <img src="${pathPrefix}pictures/return-icon.png" alt="" class="info-icon">
            <div>
                <p class="info-title">Retur Gratuit</p>
                <p class="info-text">Ai 14 zile la dispoziție</p>
            </div>
        </div>
    </div>

    <div class="product-info-details" id="produs-${produs.id}">
        <span class="product-category-tag">${produs.categorie}</span>
        <h1>${produs.nume}</h1>
        <p class="price">${produs.pret.toFixed(2)} RON</p>
        
        <div class="purchase-actions">
            <button class="add-btn">Adaugă în coș</button>
        </div>

        <div class="product-description">
            <h3>Descriere Produs</h3>
            <p>${produs.descriere || 'Produs profesional de curățenie.'}</p>
        </div>
    </div>
`;

    // Incarcam sectiunile secundare
    loadReviews(productId);
    loadRecommendations(productId, pathPrefix);
    setupReviewSubmission(productId);
}

// --- FUNCTII AUXILIARE PENTRU PRODUS ---
async function loadReviews(productId) {
    const container = document.getElementById('reviews-container');
    const { data: recenzii } = await window.supaClient.from('recenzii').select('*').eq('product_id', productId).order('created_at', {ascending: false});
    if (recenzii && recenzii.length > 0) {
        container.innerHTML = recenzii.map(r => `
            <div class="review-card">
                <div class="review-header">
                    <span class="review-name">${r.nume_utilizator}</span>
                    <span class="stars">${'★'.repeat(r.stele)}${'☆'.repeat(5-r.stele)}</span>
                </div>
                <p>${r.comentariu}</p>
            </div>
        `).join('');
    } else { container.innerHTML = '<p>Fii primul care lasă o recenzie!</p>'; }
}

async function loadRecommendations(currentId, pathPrefix) {
    const { data: produse } = await window.supaClient.from('produse').select('*').neq('id', currentId).limit(8);
    
    const container = document.getElementById('random-products-container');
    if (produse && container) {
        // Ne asigurăm că are clasa pentru carousel
        container.classList.add('carousel-mode');
        
        container.innerHTML = produse.map(p => `
            <div class="product-card" id="produs-${p.id}">
                <div class="product-image">
                    <a href="${pathPrefix}produs.html?id=${p.id}">
                        <img src="${pathPrefix}pictures/${p.imagine}" alt="${p.nume}">
                    </a>
                </div>
                <div class="product-info">
                    <a href="${pathPrefix}produs.html?id=${p.id}" style="text-decoration:none; color:inherit;">
                        <h3>${p.nume}</h3>
                    </a>
                    <p class="price">${p.pret.toFixed(2)} RON</p>
                    <button class="add-btn">Adaugă în coș</button>
                </div>
            </div>
        `).join('');
    }
}

async function setupReviewSubmission(productId) {
    const form = document.getElementById('review-form');
    const nameInput = document.getElementById('rev-nume');
    if (!form) return;

    // 1. Verificăm dacă utilizatorul este logat
    const { data: { session } } = await window.supaClient.auth.getSession();
    let userName = "";

    if (session) {
        // Dacă e logat, extragem numele (din metadata sau email)
        userName = session.user.user_metadata.full_name || session.user.email.split('@')[0];
        
        // Ascundem câmpul de nume deoarece îl avem deja
        if (nameInput) {
            nameInput.value = userName;
            nameInput.style.display = "none"; 
        }
        
        // Opțional: adăugăm un mesaj mic sub titlu
        form.insertAdjacentHTML('afterbegin', `<p style="font-size: 0.85rem; margin-bottom: 1rem; color: #636e72;">Postezi ca: <strong>${userName}</strong></p>`);
    }

    form.onsubmit = async (e) => {
        e.preventDefault();
        
        // Dacă nu e logat, folosim ce a scris în input
        const finalName = session ? userName : document.getElementById('rev-nume').value;

        const payload = {
            product_id: productId,
            nume_utilizator: finalName,
            stele: parseInt(document.getElementById('rev-rating').value),
            comentariu: document.getElementById('rev-text').value
        };

        const { error } = await window.supaClient.from('recenzii').insert([payload]);
        
        if (!error) { 
            alert("Recenzia a fost adăugată cu succes!"); 
            location.reload(); 
        } else {
            console.error("Eroare Supabase:", error);
            alert("Eroare la trimiterea recenziei.");
        }
    };
}
