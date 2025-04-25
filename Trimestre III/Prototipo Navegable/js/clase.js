import { obtenerAulasPorUsuario, unirseAula } from "./db/aulas.db.js";
import { obtenerIdUsuario, obtenerUsuario } from "./db/usuarios.db.js";

const seleccionarClase = (url, idAula) => {
  localStorage.setItem("idAula", idAula);
  location.href = url;
}

window.seleccionarClase = seleccionarClase

const actualizarClases = () => {
  const clasesContenedor = document.querySelector(".clases-contenedor");

  // Recuperar las aulas desde localStorage
  const aulas = obtenerAulasPorUsuario()

  // Generar dinámicamente las clases
  const clasesHTML = aulas.map(aula => {
    const usuario = obtenerUsuario(aula.idUsuario)
    const nombre = `${usuario.nombre1} ${usuario.apellido1}`
    const esProfesor = aula.idUsuario == obtenerIdUsuario()

    const onclick = `seleccionarClase('${esProfesor ? 'lista-ejercicios-profesor.html' : 'lista-ejercicios.html'}', ${aula.idAula})`

    return `
        <a class="clase" onmousedown="${onclick}">
          <div class="clase-titulo">
            <p>${aula.nombre}</p>
          </div>
          <p class="clase-creador">
            ${nombre}
          </p>
        </a>
    `}).join("");

  // Insertar las clases en el contenedor
  clasesContenedor.innerHTML = clasesHTML;
}

actualizarClases()

document.querySelector(".unirse-clase").addEventListener("click", function () {
  const codigo = document.querySelector(".input-codigo").value;

  if (unirseAula(obtenerIdUsuario(), codigo)) {
    actualizarClases()
  }
});