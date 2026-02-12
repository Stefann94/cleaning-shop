// componente.js
document.addEventListener("DOMContentLoaded", () => {
    // Detectăm dacă suntem într-un subfolder pentru a ajusta căile (../)
    const isSubpage = window.location.pathname.includes('/') && 
                     !window.location.pathname.endsWith('index.html') && 
                     window.location.pathname.split('/').length > 2;
    
    const pathPrefix = isSubpage ? "../" : "";

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
                            <li><a href="#">Detergenți WC</a></li>
                            <li><a href="#">Anticalcar</a></li>
                            <li><a href="#">Odorizante</a></li>
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
                            <li><a href="#">Degresanți</a></li>
                            <li><a href="#">Detergenți Vase</a></li>
                            <li><a href="#">Curățare Cuptor</a></li>
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
                            <li><a href="#">Detergent Parchet</a></li>
                            <li><a href="#">Soluții Gresie</a></li>
                            <li><a href="#">Mopuri & Găleți</a></li>
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
                            <li><a href="#">Detergent Lichid</a></li>
                            <li><a href="#">Balsam Rufe</a></li>
                            <li><a href="#">Îndepărtare Pete</a></li>
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
                            <li><a href="#">Săpun Lichid</a></li>
                            <li><a href="#">Dezinfectanți Mâini</a></li>
                            <li><a href="#">Gel de Duș</a></li>
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
                            <li><a href="#">Lavete & Bureți</a></li>
                            <li><a href="#">Mănuși Protecție</a></li>
                            <li><a href="#">Perii Curățenie</a></li>
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
                    <span>07xx xxx xxx</span>
                </div>
                <div class="top-item">
                    <img src="${pathPrefix}pictures/pin-icon.png" class="top-icon" alt="">
                    <span>Locație: București</span>
                </div>
                <div class="top-auth">
                    <a href="/login/login.html" class="auth-link login">Log In</a>
                    <span class="auth-divider"></span>
                    <a href="/login/login.html" class="auth-link signup">Sign Up</a>
                </div>
            </div>
        </div>
    </div>
    `;



    const widgetsHTML = `
    <div class="fixed-widgets">
        <a href="${pathPrefix}cart.html" class="cart-widget">
            <img src="${pathPrefix}pictures/cos.png" alt="Cos">
            <span>Coș de cumpărături</span>
        </a>
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