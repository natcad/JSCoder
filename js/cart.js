import { renderizarHeader } from "../js/components/header.js";
import { renderizarFooter } from "../js/components/footer.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let validCoupons = {
  "DESCUENTO10": 0.1,
  "DESCUENTO20": 0.2,
};

//renderiza el total de la compra
function renderizarTotal() {
  const totalContainer = document.createElement('div')
  totalContainer.classList.add("total-container");

  const container= document.querySelector('.container')
  let subtotal = 0;

  cart.forEach((elem) => {
    subtotal += elem.product.precio*elem.quantity;
  });

  totalContainer.innerHTML = "";
  let descuento = 0;
  let total = subtotal - descuento;
  totalContainer.innerHTML += `
      <div class="coupon-container"> 
        <p>¿Tienes un cupón de descuento?</p>
        <div class="coupon-input">
          <input type="text" id="coupon-code" placeholder="Ingresa el cupón de descuento" />
          <button class="apply-coupon">Aplicar Cupón</button>
        </div>
         <p id="coupon-message"></p>
      </div>
      <div class="subtotal">
        <p> Subtotal: </p>
        <p> $${subtotal.toFixed(2)}</p>
      </div>
      <div class="descuento-container" style="display: none;">
      <p>Descuento: </p>
      <p class="discount-amount">$${descuento}</p> 
    </div>
    <div class="total-container">
      <p>Total: </p>
      <p class="total-amount">$${total.toFixed(2)}</p> 
    </div>
    <div class="buy-btn">
      <button class="buy" id="buy-btn" >Finalizar Compra</button>
    </div>
    `;
  container.appendChild(totalContainer)
  document.querySelector(".apply-coupon").addEventListener("click", () => aplicarCupon(subtotal));
  document.getElementById('buy-btn').addEventListener('click', function(){mostrarMsjGracias();});
}
function mostrarMsjGracias(){
  //utiliza la libreria sweet alert para agradecer la compra
  Swal.fire({
    icon:'success',
    title:'¡Gracias por tu compra!',
    text: 'Tu pedido ha sido procesado con exito.',
    confirmButtonText: 'Aceptar',
    timer: 3000,
    timerProgressBar:true
  });
}

//Aplica cupon
function aplicarCupon(subtotal) {
  const couponCode = document.getElementById("coupon-code").value.trim().toUpperCase();
  const couponMessage = document.getElementById("coupon-message");
  const discountContainer = document.querySelector(".descuento-container");
  const discountAmountElem = document.querySelector(".discount-amount");
  const totalAmountElem = document.querySelector(".total-amount");

  if (validCoupons[couponCode]) {
    const discount = validCoupons[couponCode];
    const descuento = subtotal * discount;
    const totalConDescuento = subtotal - descuento;
    //muestra el descuento en el total solo si el cupon es valido
    discountContainer.style.display = "block";
    discountAmountElem.textContent = `-$${descuento.toFixed(2)}`;
    totalAmountElem.textContent = `$${totalConDescuento.toFixed(2)}`;

    couponMessage.textContent = `Cupón aplicado: -${(discount * 100).toFixed(0)}%`;
    couponMessage.style.color = "green";
  } else {
    couponMessage.textContent = "Cupón inválido";
    couponMessage.style.color = "red";
//no lo muestra si no se hace el decuento
    discountContainer.style.display = "none";
    discountAmountElem.textContent = `$0.00`;
    totalAmountElem.textContent = `$${subtotal.toFixed(2)}`;
  }
}
//renderiza el carrito
function renderizarCarrito() {
  const cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";
  
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p> El carrito está vacío.</p>";
  } else {
    cart.forEach((elem) => {
      cartContainer.innerHTML += `
      <div class="cart-item">
        <div class="cart-product">
          <div class="cart-img">
            <img src="${elem.product.img}" alt="${elem.product.nombre}" >
          </div>
          <div class="content"> 
            <h2 class="cart-name">${elem.product.nombre}</h2>
            <p> Cantidad: ${elem.quantity}</p>
            <p class="cart-price">$${elem.product.precio.toFixed(2)}</p>
            
          </div> 
        </div>
        <button class="remove" data-product-id="${elem.product.id}">Quitar del carrito</button>
      </div>
    `;
    }); 

    const btnContainer= document.querySelector('.container-btn');
    btnContainer.innerHTML='<button class="removeAll">Quitar todo del carrito</button>'
    document.querySelector(".removeAll").addEventListener("click", elimarCarrito);
    
    const removeButtons = document.querySelectorAll(".remove");    
    removeButtons.forEach((button) => {
      button.addEventListener("click", eliminarDelCarrito);
    });

    renderizarTotal();
  }
}

function elimarCarrito() {
  //elimina todo del carrito
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function eliminarDelCarrito(product) {
  //elimina un producto especidico del carrto
  const productId = product.target.getAttribute("data-product-id");
  const productIndex = cart.findIndex(item => item.product.id == productId);
  //si encuentra el indice en el carrito 
  if (productIndex !== -1) {
    //elimina el que coincide
    cart.splice(productIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart)); 
    //si ya existia el total lo elimina para que renderice nuevamente
    if(document.querySelector('.total-container')){
      document.querySelector('.total-container').remove();
      }
    renderizarCarrito();
    if (cart.length==0){
      //si queda vacio recarga la pagina
      location.reload();
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderizarHeader();
  renderizarCarrito();
  renderizarFooter();
});