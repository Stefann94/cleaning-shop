// checkout.js

// 1. Randarea listei de produse cu controale de editare
window.renderCheckoutPage = () => {
    const listContainer = document.getElementById('checkout-list');
    const totalDisplay = document.getElementById('final-total-sum');
    const cart = window.getCart(); // Citim din cos.js

    if (!listContainer) return;

    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align:center; padding: 3rem 0;">
                <p style="color: #64748b;">Coșul tău este gol.</p>
                <a href="/index.html" style="color:var(--main-blue); font-weight:bold; text-decoration:none;">← Înapoi la cumpărături</a>
            </div>`;
        if(totalDisplay) totalDisplay.innerText = "0.00 RON";
        return;
    }

    listContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="/pictures/${item.imagine.split('/').pop()}" alt="${item.nume}">
            <div class="item-details">
                <h4>${item.nume}</h4>
                <p>${item.pret.toFixed(2)} RON</p>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="modificaCantitateCheckout(${item.id}, -1)">-</button>
                <span>${item.cantitate}</span>
                <button class="qty-btn" onclick="modificaCantitateCheckout(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((acc, item) => acc + (item.pret * item.cantitate), 0);
    if(totalDisplay) totalDisplay.innerText = `${total.toFixed(2)} RON`;
};

// 2. FUNCȚIA DE EDITARE EXCLUSIVĂ PENTRU CHECKOUT
window.modificaCantitateCheckout = (id, schimbare) => {
    let currentCart = window.getCart();
    const index = currentCart.findIndex(p => p.id == id);
    
    if (index !== -1) {
        currentCart[index].cantitate += schimbare;
        
        // Dacă scade sub 1, eliminăm produsul
        if (currentCart[index].cantitate <= 0) {
            currentCart.splice(index, 1);
        }
        
        // Salvăm în localStorage folosind funcția din cos.js pentru a actualiza și restul site-ului
        window.saveCart(currentCart);
        
        // Re-randăm pagina curentă
        window.renderCheckoutPage();
    }
};

// 3. Logica formularului de trimitere
const initCheckoutForm = () => {
    const form = document.getElementById('checkout-form-final');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cart = window.getCart();
        const totalDisplay = document.getElementById('final-total-sum');
        
        if (cart.length === 0) {
            alert("Coșul este gol!");
            return;
        }

        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.innerText = "Se trimite comanda...";

        const payload = {
            client_nume: document.getElementById('c-nume').value,
            client_email: document.getElementById('c-email').value,
            client_telefon: document.getElementById('c-telefon').value,
            client_adresa: document.getElementById('c-adresa').value,
            produse: cart,
            total_plata: parseFloat(totalDisplay.innerText)
        };

        try {
            const { error } = await window.supaClient.from('comenzi').insert([payload]);
            if (error) throw error;

            alert("Vă mulțumim! Comanda dumneavoastră a fost primită.");
            localStorage.removeItem('cos-cumparaturi'); // Golim tot
            window.location.href = '/index.html';
        } catch (err) {
            alert("Eroare la trimitere: " + err.message);
            btn.disabled = false;
            btn.innerText = "Finalizează Comanda";
        }
    });
};

// Pornire
document.addEventListener('DOMContentLoaded', () => {
    window.renderCheckoutPage();
    initCheckoutForm();
});