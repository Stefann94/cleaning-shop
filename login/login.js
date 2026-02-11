// login/login.js

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authStatus = document.getElementById('auth-status');
const tabLogin = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');

// 1. Comutarea între tab-uri (Login / Sign Up)
tabLogin.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    authStatus.innerText = ""; // Curățăm mesajele vechi
});

tabSignup.addEventListener('click', () => {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
    authStatus.innerText = "";
});

// 2. Logica pentru Înregistrare (Sign Up)
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;

    authStatus.style.color = "orange";
    authStatus.innerText = "Se creează contul...";

    const { data, error } = await window.supaClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: name }
        }
    });

    if (error) {
        authStatus.style.color = "red";
        authStatus.innerText = "Eroare: " + error.message;
    } else {
        authStatus.style.color = "green";
        authStatus.innerText = "Cont creat! Verifică email-ul pentru confirmare.";
    }
});

// 3. Logica pentru Autentificare (Login)
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    authStatus.style.color = "orange";
    authStatus.innerText = "Se verifică datele...";

    const { data, error } = await window.supaClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        authStatus.style.color = "red";
        authStatus.innerText = "Eroare: " + error.message;
    } else {
        authStatus.style.color = "green";
        authStatus.innerText = "Logare reușită! Te redirecționăm...";
        // După 1.5 secunde mergem pe prima pagină
        setTimeout(() => window.location.href = '/', 1500);
    }
});