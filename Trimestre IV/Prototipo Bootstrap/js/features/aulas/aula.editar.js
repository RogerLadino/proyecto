import { obtenerIdAula, eliminarAula, editarAula, obtenerAula } from "../../db/aulas.db.js";

document.querySelector(".titulo h1").textContent = obtenerAula().nombre;

document.querySelector(".campo input").addEventListener("input", () => {
  const inputNombreClase = document.querySelector(".campo input");
  const tituloClase = document.querySelector(".titulo h1");

  if (tituloClase && inputNombreClase) {
    tituloClase.textContent = inputNombreClase.value.trim() || "Crear Clase";
  }
});

document.querySelector(".boton-guardar").addEventListener("click", (event) => {
  event.preventDefault();

  const nombre = document.querySelector(".campo input").value.trim();

  editarAula(obtenerIdAula(), nombre);

  location.href = "lista-ejercicios-profesor.html"
});

document.querySelector(".boton-borrar").addEventListener("click", (event) => {
  event.preventDefault();

  const aula = obtenerAula()

  const nombreAula = prompt("Ingresa el nombre de la clase que deseas eliminar:");
  if (!nombreAula) {
    alert("Por favor, ingresa un nombre válido.");
    return;
  }
  if (nombreAula != aula.nombre) {
    alert("El nombre del aula no coincide con el aula seleccionada.");
    return;
  }

  eliminarAula();

  location.href = "clases.html";
});
