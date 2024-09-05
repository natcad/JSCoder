 function crearProducto(productos) {
  
  let card = "";
  for (const producto of productos) {
    card += `
            <div class="product_container">
              <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
              <div class="content" > 
                <h2 class="product-name">${producto.nombre}<h2>
                <p class="product-price"> ${producto.precio} </p>
                <button class="add-cart" data-product-id="${producto.id}" > Añadir al carrito <button>
              </div>    
            </div>
    `;
  }
  return card;
}

export function renderizarProducto(productos) {
  const indexContainer = document.querySelector(".container");
  indexContainer.innerHTML = crearProducto(productos);

  const cartButtons= document.querySelectorAll('.add-cart');
  cartButtons.forEach(button =>{
    button.addEventListener('click', (añadir)=>{
        const productId =añadir.target.getAttribute('data-product-id');
        const product = productos.find(p => p.id === parseInt(productId));
        addToCart(product);
    })
  })
}

function addToCart(product){
    let cart = JSON.parse(localStorage.getItem('cart'))|| [];
     cart.push({product, quantity:1});
     localStorage.setItem('cart',JSON.stringify(cart));
     console.log('producto con ID ' + product.id + ' añadido al carrito');
}

