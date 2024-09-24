function crearFooter(){
    let footer =`
        <div class="footer-content"> 
            <div class="footer-column">
            <div class="footer-section">
                <h2> Sobre Nosotros </h2>
                <p>En Tendencia Urbana, ofrecemos moda que te hace sentir única y segura. 
                    Descubre nuestra colección y encuentra el estilo que se adapta a ti.
                </p>
            </div>
            <div class="footer-section">
                <h2> Explora </h2>
                <ul> 
                    <li> <a href="../index.html"> Inicio </a></li>
                    <li> <a href="#about-us"> Sobre Nosotros </a></li>
                    <li> <a href="../html/products.html"> Nuestros Productos </a> </li>
                    <li> <a href="#"> Tiendas </a></li>
                    <li> <a href="#"> Contactos </a></li>
                    <li><a href="#">Política de Privacidad</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-column">
            <div class="footer-section">
                <h2>Contacto</h2>
                <p>Email: contacto@tendenciaurbana.com</p>
                <p>Teléfono: +123 456 7899</p>
                <p>Dirección: Calle Ficticia 123, Buenos Aires, Argentina </p>
            </div>
            
            <div class="footer-section">
                 <h2>Síguenos</h2>
                <div id="social-links">
                    <a href="#" class="social-icon"><img src="../img/iconos/facebook.svg" alt="Facebook"></a>
                    <a href="#" class="social-icon"><img src="../img/iconos/instagram.svg" alt="Instagram"></a>
                    <a href="#" class="social-icon"><img src="../img/iconos/twitter.svg" alt="Twitter"></a>
                    <a href="#" class="social-icon"><img src="../img/iconos/pinterest.svg" alt="Pinterest"></a>
                </div>
            </div>            
        </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Tendencia Urbana. Todos los derechos reservados.</p>
        </div>
       
    `;
    return footer;
}

export function renderizarFooter(){
    const footerContainer =document.querySelector("footer");
    footerContainer.innerHTML= crearFooter();
}