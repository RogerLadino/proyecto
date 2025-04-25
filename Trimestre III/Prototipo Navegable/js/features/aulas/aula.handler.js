import { esProfesor, obtenerAula } from "../../db/aulas.db.js"
import { obtenerIdUsuario, obtenerUsuario } from "../../db/usuarios.db.js"

export const actualizarNombreAula = () => {
  const aula = obtenerAula()
  const usuario = obtenerUsuario(aula.idUsuario)

  document.querySelector(".nombre-clase").innerHTML = aula.nombre

  document.querySelector(".nombre-profesor").innerHTML = `${usuario.nombre1} ${usuario.apellido1}`
}

export const actualizarCodigoAula = () => {
  const aula = obtenerAula()

  document.querySelector(".codigo-clase").innerHTML = aula.codigo
}

import { obtenerAulasPorUsuario } from "../../db/aulas.db.js";

export const cargarSidebarClases = () => {
  const aulas = obtenerAulasPorUsuario(); // Obtener las aulas del usuario
  const sidebar = document.querySelector(".side-nav ul"); // Contenedor de la sidebar

  // Generar dinámicamente los elementos de la sidebar
  const clasesHTML = aulas.map(aula => {
    const esProfesor = aula.idUsuario == obtenerIdUsuario(); // Verificar si el usuario es profesor
    const link = `cambiarAula(${esProfesor ? "'lista-ejercicios-profesor.html'" : "'lista-ejercicios.html'"}, ${aula.idAula})`;

    return `
    <li class="nav-item class1">
      <div class="class-icon">
        <i class="empty-square"></i>
      </div>
      <a href="#" onclick="${link}">${aula.nombre}</a>
    </li>
  `}).join("");

  // Insertar las clases en la sidebar
  sidebar.innerHTML = `
    <i class="divisor"></i>
    <li class="nav-item home">
      <a href="clases.html">
        <i class="icon-home"></i>
        <span>Inicio</span>
      </a>
    </li>
    <i class="divisor"></i>
    ${clasesHTML}
  `;
};

// Función para cambiar el aula seleccionada
export const cambiarAula = (url, idAula) => {
  localStorage.setItem("idAula", idAula); // Actualizar el idAula en localStorage
  location.href = url
};

// Hacer la función `cambiarAula` accesible desde el HTML
window.cambiarAula = cambiarAula;

// Cargar las clases en la sidebar al cargar la página
document.addEventListener("DOMContentLoaded", cargarSidebarClases);