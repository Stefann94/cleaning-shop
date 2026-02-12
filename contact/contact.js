// contact/contact.js

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const status = document.getElementById('form-status');
    const btn = e.target.querySelector('button');
    
    // Datele din formular
    const formData = {
        nume: document.getElementById('nume').value,
        email: document.getElementById('email').value,
        mesaj: document.getElementById('mesaj').value,
        data: new Date().toISOString()
    };

    btn.disabled = true;
    btn.innerText = 'Se trimite...';

    // Aici poți adăuga trimiterea către Supabase dacă ai un tabel 'mesaje'
    // const { error } = await window.supaClient.from('mesaje').insert([formData]);

    setTimeout(() => {
        status.style.color = '#2ecc71';
        status.innerText = 'Mesajul a fost trimis cu succes! Te vom contacta în curând.';
        e.target.reset();
        btn.disabled = false;
        btn.innerText = 'Trimite Mesajul';
    }, 1500);
});