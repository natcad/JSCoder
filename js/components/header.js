export function crearHeader(){
    let header = `
                    <div class="logo"> 
                        <img src="../img/iconos/LOGO-01.png" class="logo-img" alt="Tienda Urbana">
                    </div>
                    <nav>
                        <ul>
                        <li>
                            <a href="../html/index.html"> INICIO </a>
                        </li>
                        
                        <li>
                            <a href="../html/products.html"> PRODUCTOS </a>
                        </li>
                        
                        </ul>
                    </nav>
                    <div class = "left">
                        <a href="./cart.html"> <i class="fas fa-shopping-cart cart-icon"></i> </a>
                        <div class="dropdown">
                            <i class="fas fa-user user-icon" onclick="toggleDropdown()"></i>
                            <div class="dropdown-content"  id="userDropdown">
                                <a href="./login.html"> Iniciar Sesión</a>
                            </div>
                        </div>
                    </div>
                    `;
    return header;
                    
}
export function renderizarHeader(){
    const headerContainer =document.querySelector("header");
    const header= crearHeader();
    headerContainer.innerHTML= header;

    const userIcon= document.querySelector('.user-icon');
    const dropdown= document.getElementById('userDropdown');

    userIcon.addEventListener('click', function(){
        dropdown.classList.toggle('show');
    });

    window.addEventListener('click', function(event){
        if(!event.target.matches('.user-icon')){
            if(dropdown.classList.contains('show')){
                dropdown.classList.remove('show');
            }
        }
    });


}

