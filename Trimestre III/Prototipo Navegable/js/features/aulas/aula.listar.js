import { obtenerAulasDictadas, obtenerAulasPertenecientes, unirseAula } from "../../db/aulas.db.js";
import { obtenerIdUsuario, obtenerUsuario } from "../../db/usuarios.db.js";

const seleccionarClase = (url, idAula) => {
  localStorage.setItem("idAula", idAula);
  location.href = url;
}

const mostrarClase = (idAula, nombreAula, nombreUsuario, esProfesor) => {
  const onclick = `seleccionarClase('${esProfesor ? 'lista-ejercicios-profesor.html' : 'lista-ejercicios.html'}', ${idAula})`

  return `
    <a class="clase" onmousedown="${onclick}">
      <div class="clase-titulo">
        <p>${nombreAula}</p>
      </div>
      <p class="clase-creador">
        ${nombreUsuario}
      </p>
    </a>
    `
}

const mostrarClasesDictadas = () => {
  const aulas = obtenerAulasDictadas()

  const clasesHTML = aulas.map(aula => {
    const usuario = obtenerUsuario(aula.idUsuario)
    const nombre = `${usuario.nombre1} ${usuario.apellido1}`
    const esProfesor = aula.idUsuario == obtenerIdUsuario()

    return mostrarClase(aula.idAula, aula.nombre, nombre, esProfesor)
  })

  document.querySelector(".clases-dictadas").innerHTML = clasesHTML;
}

const mostrarClasesPertenecientes = () => {
  const aulas = obtenerAulasPertenecientes()

  const clasesHTML = aulas.map(aula => {
    const usuario = obtenerUsuario(aula.idUsuario)
    const nombre = `${usuario.nombre1} ${usuario.apellido1}`
    const esProfesor = aula.idUsuario == obtenerIdUsuario()

    return mostrarClase(aula.idAula, aula.nombre, nombre, esProfesor)
  })

  document.querySelector(".clases-pertenecientes").innerHTML = clasesHTML;
}


document.querySelector(".unirse-clase").addEventListener("click", function () {
  const codigo = document.querySelector(".input-codigo").value;

  unirseAula(obtenerIdUsuario(), codigo)

  mostrarClasesPertenecientes()
  codigo.value = ""
});

mostrarClasesDictadas()
mostrarClasesPertenecientes()

window.seleccionarClase = seleccionarClase