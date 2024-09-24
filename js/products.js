import { renderizarHeader } from "../js/components/header.js";
import { AddToCartButton } from "./components/addToCart.js";

import { renderizarFooter } from "./components/footer.js";

const categorias = [
  "Tops",
  "Pantalon",
  "Abrigos",
  "Vestidos",
  "Shorts",
  "Denim",
  "Polleras",
  "Sweaters",
  "Buzos",
  "Conjuntos",
  "Blusas y Camisas",
];
let productosCargados = [];
function crearCategoria(cat) {
  const catItem = document.createElement("div");
  catItem.classList.add("categoria-item");

  catItem.innerHTML = `<div class="categoria-item"> 
    <p> <a href="#" class="categoria-link"> ${cat} </a></p>                              
    </div>`;
    catItem.querySelector('.categoria-link').addEventListener('click', (event) => {
      event.preventDefault(); 
      filtrarProductos(cat);
    });

  return catItem;
}


function crearProducto(producto) {
  const productItem = document.createElement("div");
  productItem.classList.add("producto-item");

  productItem.innerHTML = `
        
        <div class="img-container">
            <a href="../html/productDetail.html?id=${producto.id}">
             <img src="${producto.img}" alt="${producto.nombre}"/>
            </a>S
        </div>
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio} </p>
        
        
    `;
  const addToCartButton = AddToCartButton(producto);
  productItem.appendChild(addToCartButton);

  return productItem;
}
function renderizarProductos(productos, productosContainer) {
  productosContainer.innerHTML = "";
  productos.forEach((producto) => {
    productosContainer.appendChild(crearProducto(producto));
  });
}
function filtrarProductos(categoria) {
  const productosFiltrados = productosCargados.filter(producto => 
    producto.categorias.includes(categoria) 
  );
  const productosContainer = document.querySelector(".productos-container");
  renderizarProductos(productosFiltrados, productosContainer); 
}

function cargarProductos(productosContainer) {
  fetch("../JSON/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json();
    })
    .then((data) => {
      productosCargados=data.productos;
      renderizarProductos(productosCargados, productosContainer);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarHeader();
  //banner
  const section1 = document.querySelector(".section1");
  const banner = document.createElement("div");
  const bannerImg = document.createElement("img");
  banner.classList.add("banner-container");
  bannerImg.classList.add("banner-img");
  bannerImg.src = "../img/products/banner.png";
  banner.appendChild(bannerImg);
  section1.appendChild(banner);

  // categorias
  const section2 = document.querySelector(".section2");
  const categoriaContainer = document.createElement("div");
  categoriaContainer.classList.add("categorias-container");
  categorias.forEach((cat) => {
    categoriaContainer.appendChild(crearCategoria(cat));
  });
  section2.appendChild(categoriaContainer);

  //productos
  const productosContainer = document.createElement("div");
  productosContainer.classList.add("productos-container");
  cargarProductos(productosContainer);

  section2.appendChild(productosContainer);

  renderizarFooter();
});
