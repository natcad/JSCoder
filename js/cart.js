import { renderizarHeader } from "../js/components/header.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function renderizarCarrito() {
  
  const cartContainer = document.querySelector(".container");
    cartContainer.innerHTML="";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p> El carrito está vacío.</p>";
  } else {
    cart.forEach((elem) => {
      cartContainer.innerHTML += `
      <div class="cart-product">
        <img src="${elem.product.imagen}" alt="${elem.product.nombre}" class="cart-img">
        <div class="content"> 
          <h2 class="cart-name">${elem.product.nombre}</h2>
          <p class="cart-price">${elem.product.precio}</p>
          <button class="remove" data-product-id="${elem.product.id}">Quitar del carrito</button>
        </div> 
      </div>
      
    `;
    });
    const removeButtons= document.querySelectorAll(".remove");
    removeButtons.forEach((button)=>{
        button.addEventListener("click", eliminarDelCarrito);
    })
    document.querySelector(".removeAll").addEventListener("click", elimarCarrito);
  }

}
function elimarCarrito(){
    cart=[];
    localStorage.setItem('cart',JSON.stringify(cart));
    renderizarCarrito();
}
function eliminarDelCarrito(product){
    const productId=product.target.getAttribute("data-product-id");
    cart.splice(productId,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    renderizarCarrito();
}

renderizarHeader();
renderizarCarrito();
