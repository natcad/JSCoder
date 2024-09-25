import { renderizarHeader } from "../js/components/header.js";

import { renderizarFooter } from "./components/footer.js";


async function cargarDatos() {
  try{
    const respone = await fetch('../JSON/home.json');
    if(!respone.ok){
      throw new Error('Error al carga los datos');
    }
    const datos = await respone.json();
    return datos;
  }catch (error){
    console.error('Error:', error);
    return null;
  }
}
//crea carruseles, los parametros son la clase de la seccion donde crearlo, el array de img, y si va a tener overlay o no (Bool)
function crearCarrusel(section, imagenes, overlay,itemsVisible) {
  // Selecciona el container del index
  const pageContainer = document.querySelector(section);

  // selecciona el container carousel
  const carruselContainer = document.createElement('div');
  carruselContainer.classList.add("carousel-container");

  // Crea un div para el interior del carrusel
  const carruselInner = document.createElement("div");
  carruselInner.classList.add("carousel-inner");

  imagenes.forEach((src, index) => {
    // Crea un div item
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    // Si el index es 0 agrega clase active
    if (index === 0) item.classList.add("active");

    // Crea un img con la ruta de las imágenes
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Imagen ${index + 1}`;

    // A item le agrega el img y a carruselInner el item
    item.appendChild(img);
    carruselInner.appendChild(item);
  });
  //logica del carrusel
  carruselContainer.appendChild(carruselInner);
  let index = 0;
  setInterval(() => {
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    index = (index + 1) % Math.ceil(totalItems / itemsVisible);
    const offset = index * (100 / itemsVisible);
    carruselInner.style.transform = `translateX(-${offset}%)`;
  }, 3000);
  if (overlay) {
    crearOverlay(pageContainer);
  }
  pageContainer.appendChild(carruselContainer);
}

//crea el overlay
function crearOverlay(pageContainer) {
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("carrusel-overlay");

  const overlayTitle = document.createElement("h2");
  overlayTitle.textContent = "NEW SEASON SPRING SUMMER";

  const overlayButton = document.createElement("button");
  overlayButton.textContent = "Conocé la nueva temporada";
  overlayButton.classList.add("carrusel-button");
  overlayButton.addEventListener("click", () => {
    window.location.href = "./products.html"; 
  });

  overlayContainer.appendChild(overlayTitle);
  overlayContainer.appendChild(overlayButton);

  pageContainer.appendChild(overlayContainer);
}

//crea seccion about us
function crearAboutUs(aboutUs) {
  const pageContainer = document.querySelector(".container-section2");

  const imgSection = document.createElement("div");
  imgSection.classList.add("img-container");
  
  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  textContainer.innerHTML= `
    <div class="text">
      <p>Bienvenida a Tendencia Urbana donde la moda es para todas. Aquí, 
        cada prenda está pensada para hacerte sentir única, cómoda y segura 
        en tu piel. Creemos que la moda debe ser inclusiva, divertida y reflejar 
        quién eres realmente. Encuentra looks que no solo se adaptan a tu estilo, 
        sino que también te llenan de felicidad, con la tranquilidad de saber que 
        cada detalle ha sido cuidadosamente diseñado pensando en tu bienestar. </p>
    </div>
    
    <div class="text">
      <p>Moda que empodera  en Tendencia Urbana sabemos que la ropa no solo
        es un accesorio, es una forma de expresión. Nuestras colecciones están 
        diseñadas pensando en la mujer moderna, dinámica y única. Encuentra 
        desde básicos esenciales hasta piezas icónicas que marcarán tendencia 
        en cada temporada. Viste como la mujer que deseas ser. </p>
    </div>

    
    <div class="text">
       <p> Sé feliz, sé tú misma, la moda es más que ropa, es una herramienta de 
        expresión. En Tendencia Urbana, nos enfocamos en crear piezas 
        que te hagan sentir feliz y libre de ser quien eres. Porque creemos que 
        cuando te sientes bien por fuera, se nota por dentro. 
        ¡Es hora de divertirse con la moda y disfrutar cada momento con 
        comodidad y seguridad!</p>
    </div>`;


  aboutUs.forEach((src, index)=>{
    const imgItem=document.createElement('div');
    imgItem.classList.add('img-item');
    const img=document.createElement('img');
    img.src=src;
    img.alt=`Imagen ${index+1}`;
    imgItem.appendChild(img);
    imgSection.appendChild(imgItem);
  });
  pageContainer.appendChild(imgSection);
  pageContainer.appendChild(textContainer);
}

document.addEventListener("DOMContentLoaded", async () => {
  const datos =await cargarDatos();
  renderizarHeader();
  if(datos){
    const section1 = ".container-section1";
    crearCarrusel(section1, datos.summer, true,2);
    crearAboutUs(datos.aboutUs);
    const section3='.container-section3';
    crearCarrusel(section3,datos.marca,false,4);
  }
  
  renderizarFooter();
});
