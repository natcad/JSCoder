
import {renderizarHeader} from "../js/components/header.js";
import { renderizarProducto } from "../js/components/product.js";
document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1,
          nombre: "Remera",
          precio: "$1234",
          imagen: "../img/products/producto1.jpg",
        },
    
        { id: 2,
          nombre: "Pantalon",
          precio: "$1234",
          imagen: "../img/products/producto2.webp",
        },
    
        { id: 3,
          nombre: "Buzo",
          precio: "$1234",
          imagen: "../img/products/producto3.jpg",
        },
      ];
    
    renderizarHeader();
    renderizarProducto(productos);
  
  });
  


// const contenedor = document.querySelector("contenedor");

// const productos=[{nombre: "producto1"}, {nombre: "producto2"}];


// function crearHtml(arr){
//     contenedor.innerHTML ="";

//     let html;

//     for(const el of arr){
//         html += `<div class= "card">
//                     <p> ${el.nombre} </p> 
//                 </div>    
//         `;
//     }
//     contenedor.innerHTML=html;
// }

// crearHtml(productos);