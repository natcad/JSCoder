import { renderizarHeader } from "../js/components/header.js";
import { renderizarFooter } from "./components/footer.js";
import { AddToCartButton } from "./components/addToCart.js";

document.addEventListener("DOMContentLoaded", () => {
  renderizarHeader();
  renderizarFooter(); // Si quieres renderizar el footer también, descomenta esta línea.

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch("../JSON/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json();
    })
    .then((data) => {
      const product = data.productos.find((p) => p.id == productId);
      if (product) {
        // Actualiza el contenido de la página con los datos del producto
        
        document.querySelector(".producto-imagen img").src = product.img;
        document.querySelector(".producto-imagen img").alt = product.nombre;
        document.querySelector(".producto-info h1").textContent =
          product.nombre;
        document.querySelector(".producto-info .descripcion").textContent =
          product.descripcion;
        document.querySelector(
          ".producto-info .precio"
        ).textContent = `Precio: $${product.precio}`;
        document.querySelector(
          ".producto-info .talles"
        ).textContent = `Talles disponibles: ${product.talle.join(", ")}`;

        const addToCartButton = AddToCartButton(product);
        document.querySelector('.producto-info').appendChild(addToCartButton);
        
        renderizarProductosRelacionados(product, data.productos);
      } else {
        console.error("Producto no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function renderizarProductosRelacionados(product, productos) {
  const productosRelacionados = productos
    .filter((p) => p.categorias === product.categorias && p.id != product.id)
    .slice(0, 3);

  if (productosRelacionados.length > 0) {
    const relacionadosContainer = document.querySelector(".productos-relacionados");
    relacionadosContainer.innerHTML = ""; 

    productosRelacionados.forEach((productoRelacionado) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("producto-relacionado");

      productoDiv.innerHTML = `
          <div class="card">
              <a href="../html/productDetail.html?id=${productoRelacionado.id}">
                  <div class="img-container">
                      <img src="${productoRelacionado.img}" alt="${productoRelacionado.nombre}" />
                  </div>
                  <div class="text-container">
                      <h3>${productoRelacionado.nombre}</h3>
                      <p>Precio: $${productoRelacionado.precio}</p>
                  </div>
              </a>
          </div>
      `;

      relacionadosContainer.appendChild(productoDiv);
    });
  } else {
    console.log("No se encontraron productos relacionados.");
  }
}