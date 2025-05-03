import { obtenerAulasDictadas, obtenerAulasPertenecientes } from "../../db/aulas.db.js";
import { obtenerIdUsuario } from "../../db/usuarios.db.js";

export const crearElementoAula = (idAula, nombre, esProfesor) => {
  const link = `cambiarAula(${esProfesor ? "'lista-ejercicios-profesor.html'" : "'lista-ejercicios.html'"}, ${idAula})`;

  return `
    <li class="nav-item class1">
      <div class="class-icon">
        <i class="empty-square"></i>
      </div>
      <a href="#" onclick="${link}">${nombre}</a>
    </li>
  `
}

export const mostrarAulasDictadas = () => {
  const aulas = obtenerAulasDictadas()

  return aulas.map(aula => {
    const esProfesor = aula.idUsuario == obtenerIdUsuario();

    return crearElementoAula(aula.idAula, aula.nombre, esProfesor);
  }).join("");
}

export const mostrarAulasPertenecientes = () => {
  const aulas = obtenerAulasPertenecientes()

  return aulas.map(aula => {
    const esProfesor = aula.idUsuario == obtenerIdUsuario();

    return crearElementoAula(aula.idAula, aula.nombre, esProfesor);
  }).join("");
}

export const cargarSidebarClases = () => {
  const sidebar = document.querySelector(".side-nav ul");

  const aulasDictadas = mostrarAulasDictadas()
  const aulasPertenecientes = mostrarAulasPertenecientes()

  sidebar.innerHTML = `
    <i class="divisor"></i>
    <li class="nav-item home">
      <a href="clases.html">
        <i class="icon-home"></i>
        <span>Inicio</span>
      </a>
    </li>
    <i class="divisor"></i>
    <h4 class="sidebar-class-title">Aulas dictadas</h4>
    ${aulasDictadas}
    <h4 class="sidebar-class-title">Aulas inscritas</h4>
    ${aulasPertenecientes}
  `;
};

export const cambiarAula = (url, idAula) => {
  localStorage.setItem("idAula", idAula);
  location.href = url
};

// Hacer la función `cambiarAula` accesible desde el HTML
window.cambiarAula = cambiarAula;

document.addEventListener("DOMContentLoaded", cargarSidebarClases);