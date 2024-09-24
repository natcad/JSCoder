import { renderizarHeader } from "../js/components/header.js";
import { renderizarFooter } from "../js/components/footer.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let validCoupons = {
  "DESCUENTO10": 0.1,
  "DESCUENTO20": 0.2,
};

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
  Swal.fire({
    icon:'success',
    title:'¡Gracias por tu compra!',
    text: 'Tu pedido ha sido procesado con exito.',
    confirmButtonText: 'Aceptar',
    timer: 3000,
    timerProgressBar:true
  });
}
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

    discountContainer.style.display = "block";
    discountAmountElem.textContent = `-$${descuento.toFixed(2)}`;
    totalAmountElem.textContent = `$${totalConDescuento.toFixed(2)}`;

    couponMessage.textContent = `Cupón aplicado: -${(discount * 100).toFixed(0)}%`;
    couponMessage.style.color = "green";
  } else {
    couponMessage.textContent = "Cupón inválido";
    couponMessage.style.color = "red";

    discountContainer.style.display = "none";
    discountAmountElem.textContent = `$0.00`;
    totalAmountElem.textContent = `$${subtotal.toFixed(2)}`;
  }
}

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
    const removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", eliminarDelCarrito);
    });

    
    document.querySelector(".removeAll").addEventListener("click", elimarCarrito);
    
    renderizarTotal();
  }
}

function elimarCarrito() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function eliminarDelCarrito(product) {
  const productId = product.target.getAttribute("data-product-id");
  console.log("Intentando eliminar producto con ID:", productId); // Añadir para depuración

  const productIndex = cart.findIndex(item => item.product.id == productId);
  console.log("Índice del producto encontrado:", productIndex); // Añadir para depuración

  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart)); 
    if(document.querySelector('.total-container')){
      document.querySelector('.total-container').remove();
      }
    renderizarCarrito();
    if (cart.length==0){
      location.reload();
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderizarHeader();
  renderizarCarrito();
  renderizarFooter();
});