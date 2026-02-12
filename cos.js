// Initializăm coșul din localStorage sau un array gol
let cart = JSON.parse(localStorage.getItem('cos-cumparaturi')) || [];

// Funcție pentru a salva coșul
const salveazaCos = () => {
    localStorage.setItem('cos-cumparaturi', JSON.stringify(cart));
    actualizeazaBadge();
};

// Actualizează numărul de pe iconiță
const actualizeazaBadge = () => {
    const badges = document.querySelectorAll('.cos-count');
    const totalProduse = cart.reduce((sum, item) => sum + item.cantitate, 0);
    badges.forEach(b => b.textContent = totalProduse);
};

// Adaugă produs în coș
window.adaugaInCos = (produs) => {
    const produsExistent = cart.find(item => item.id === produs.id);

    if (produsExistent) {
        produsExistent.cantitate += 1;
    } else {
        cart.push({ ...produs, cantitate: 1 });
    }

    salveazaCos();
    randareMiniCos();
    // Deschide popup-ul automat când adaugi ceva (opțional)
    document.getElementById('cos-popup').classList.add('active');
};

// Șterge produs
window.stergeDinCos = (id) => {
    cart = cart.filter(item => item.id !== id);
    salveazaCos();
    randareMiniCos();
};

// Afișează produsele în popup
window.randareMiniCos = () => {
    const container = document.getElementById('cos-popup-produse');
    const totalElement = document.getElementById('popup-cos-total');
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">Coșul este gol</p>';
        totalElement.textContent = '0.00 RON';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="popup-item" style="display:flex; gap:10px; margin-bottom:10px; align-items:center; border-bottom:1px solid #f9f9f9; padding-bottom:5px;">
            <img src="/pictures/${item.imagine}" style="width:40px; height:40px; object-fit:contain;">
            <div style="flex:1;">
                <h4 style="font-size:13px; margin:0;">${item.nume}</h4>
                <small>${item.cantitate} x ${item.pret} RON</small>
            </div>
            <button onclick="stergeDinCos(${item.id})" style="background:none; border:none; color:red; cursor:pointer;">✕</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.pret * item.cantitate), 0);
    totalElement.textContent = `${total.toFixed(2)} RON`;
};

// Inițializare la pornire
document.addEventListener('DOMContentLoaded', () => {
    actualizeazaBadge();
    randareMiniCos();
});