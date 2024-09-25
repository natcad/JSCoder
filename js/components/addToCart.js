//maneja la logica para agregar el carrito
export function addToCart(product) {
    //trae el carrito  busca si ya existe el prod
    //si existe le agrega cantidad sino agrega el product y la cantidad
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

//crea el boton comprar
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