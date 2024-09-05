export function crearHeader(){
    let header = `
                    <div class="logo"> 
                        <h1> Urbaner </h1> 
                    </div>
                    <nav>
                        <ul>
                        <li>
                            <a href="./index.html"> INICIO </a>
                        </li>
                        <li>
                            <a href="./login.html"> INICIAR SESION </a>
                        </li>
                        <li>
                            <a href="./cart.html"> CARRITO </a>
                        </li>
                        
                        </ul>
                    </nav>
                    <div class = "usuario">
                        <h1> Usuario</h1>
                    </div>
                    `;
    return header;
                    
}
export function renderizarHeader(){
    const headerContainer =document.querySelector("header");
    const header= crearHeader();
    headerContainer.innerHTML= header;
}

