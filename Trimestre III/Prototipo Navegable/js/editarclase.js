import { obtenerIdAula } from "./db/aulas.db.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar el array de clases desde localStorage o crear uno vacío si no existe
  let clases = JSON.parse(localStorage.getItem("aulas")) || [];

  // Selección de elementos del DOM
  const inputNombreClase = document.querySelector(".campo input");
  const tituloClase = document.querySelector(".titulo h1");
  const botonGuardar = document.querySelector(".boton-guardar");
  const botonBorrar = document.querySelector(".boton-borrar");

  // Verificar que los elementos existan
  if (!inputNombreClase || !tituloClase || !botonGuardar || !botonBorrar) {
    console.error("No se encontraron los elementos en el DOM.");
    return;
  }
  // Mostrar el título de la clase en tiempo real mientras el usuario escribe
  inputNombreClase.addEventListener("input", () => {
    tituloClase.textContent = inputNombreClase.value.trim() || "Crear Clase";
  });
  // Función para guardar o editar una clase
  botonGuardar.addEventListener("click", (event) => {
    event.preventDefault(); // Evita redirección inmediata

    const nuevoNombre = inputNombreClase.value.trim();
    if (!nuevoNombre) {
      alert("Por favor, ingresa un nombre válido para la clase.");
      return;
    }

    const idAulaEditar = obtenerIdAula();
    if (idAulaEditar) {
      // Editar clase existente
      const claseIndex = clases.findIndex((clase) => clase.idAula == idAulaEditar);
      if (claseIndex === -1) {
        alert("No se encontró una clase con ese ID.");
        return;
      }
      // Actualizar el nombre de la clase
      clases[claseIndex].nombre = nuevoNombre;
      alert(`Clase con ID ${idAulaEditar} actualizada correctamente.`);
    } else {

    }
  });
  // Función para borrar una clase
  botonBorrar.addEventListener("click", (event) => {
    event.preventDefault(); // Evita redirección inmediata

    const idAulaEliminar = parseInt(prompt("Ingresa el ID de la clase que deseas eliminar:"));
    if (!idAulaEliminar) {
      alert("Por favor, ingresa un ID válido.");
      return;
    }

    // Filtrar el array para eliminar la clase con el ID ingresado
    const clasesFiltradas = clases.filter((clase) => clase.idAula !== idAulaEliminar);
    if (clasesFiltradas.length === clases.length) {
      alert("No se encontró una clase con ese ID.");
      return;
    }
    // Guardar el array actualizado en localStorage
    clases = clasesFiltradas;
    localStorage.setItem("aulas", JSON.stringify(clases));
    alert(`Clase con ID ${idAulaEliminar} eliminada correctamente.`);
  });
});