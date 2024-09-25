import { renderizarHeader } from "../js/components/header.js";
import { renderizarFooter } from "./components/footer.js";
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

async function obtenerUsuarios() {
  try {
    const response = await fetch("../JSON/users.json");
    if (!response.ok) {
      throw new Error("Error al cargar los datos de usuarios");
    }
    const usuarios = await response.json();
    return usuarios;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

async function manejarInicioSesion(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  const usuarios = await obtenerUsuarios();

  const usuarioEncontrado = validarCredenciales(
    usuarios,
    usernameInput,
    passwordInput
  );

  if (usuarioEncontrado) {
    window.location.href = "index.html";
  } else {
    mostrarMsjError("Nombre de usuario o contraseña incorrectos");
  }
}
function validarCredenciales(usuarios, username, password) {
  return usuarios.find(
    (user) => user.user === username && user.password === password
  );
}

function mostrarMsjError(mensaje) {
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = mensaje;
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarHeader();
  loginForm.addEventListener("submit", manejarInicioSesion);
  renderizarFooter();
});
