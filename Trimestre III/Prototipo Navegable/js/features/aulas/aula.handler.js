import { obtenerAula } from "../../db/aulas.db.js";
import { obtenerUsuario } from "../../db/usuarios.db.js"

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
