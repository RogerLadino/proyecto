import { crearAula } from "../../db/aulas.db.js"; // Importar obtenerAulas

const actualizarTituloClase = () => {
  const inputNombreClase = document.querySelector(".campo input");

  const tituloClase = document.querySelector(".titulo h1");

  tituloClase.textContent = inputNombreClase.value.trim() || "Crear Clase";
};

const crearClase = (event) => {
  event.preventDefault();
  const inputNombreClase = document.querySelector(".campo input");
  if (!inputNombreClase) return;

  const nombreClase = inputNombreClase.value.trim();

  if (!nombreClase) {
    alert("Por favor, ingrese un nombre válido para la clase.");
    return;
  }

  crearAula(nombreClase)

  location.href = "clases.html";
};

document.querySelector(".campo input").addEventListener("input", actualizarTituloClase);
document.querySelector(".boton-guardar").addEventListener("click", crearClase);