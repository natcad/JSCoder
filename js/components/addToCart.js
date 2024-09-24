
export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct=cart.findIndex(item => item.product.id==product.id);
    if (existingProduct!=-1){
        cart[existingProduct].quantity+=1;
    }else{
        cart.push({ product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Producto con ID ' + product.id + ' añadido al carrito');
}


export function AddToCartButton(product) {
    const button = document.createElement('button');
    button.textContent = 'Comprar';
    button.classList.add('add-cart');
    button.setAttribute('data-product-id', product.id);

    button.addEventListener('click', () => {
        addToCart(product);
        Toastify({
            text: `${product.nombre} añadido al carrito!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            stopOnFocus: true,
        }).showToast();
    });

    return button;
}