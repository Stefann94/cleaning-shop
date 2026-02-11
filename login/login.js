// login/login.js

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authStatus = document.getElementById('auth-status');
const tabLogin = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');

// Comutare tab-uri
tabLogin.onclick = () => {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
};

tabSignup.onclick = () => {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
};

// ÎNREGISTRARE (Sign Up)
signupForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;

    authStatus.innerText = "Se creează contul...";

    const { data, error } = await window.supaClient.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
    });

    if (error) {
        authStatus.style.color = "red";
        authStatus.innerText = "Eroare: " + error.message;
    } else {
        authStatus.style.color = "green";
        authStatus.innerText = "Cont creat! Verifică email-ul pentru confirmare (check Spam).";
    }
};

// LOGARE (Login)
loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    authStatus.innerText = "Se verifică datele...";

    const { data, error } = await window.supaClient.auth.signInWithPassword({ email, password });

    if (error) {
        authStatus.style.color = "red";
        authStatus.innerText = "Eroare: " + error.message;
    } else {
        authStatus.style.color = "green";
        authStatus.innerText = "Te-ai logat! Te redirecționăm...";
        setTimeout(() => window.location.href = '/', 1500);
    }
};