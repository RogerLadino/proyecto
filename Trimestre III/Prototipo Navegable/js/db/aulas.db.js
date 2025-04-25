import { obtenerIdUsuario, obtenerUsuario } from "./usuarios.db.js";

export const obtenerIdAula = () => {
  return parseInt(localStorage.getItem("idAula"));
}

export const obtenerAulas = () => {
  return JSON.parse(localStorage.getItem("aulas")) || [];
}

const obtenerUsuariosAulas = () => {
  return JSON.parse(localStorage.getItem("usuarios_aulas")) || [];
}

export const obtenerAula = (idAula = obtenerIdAula()) => {
  return obtenerAulas().find(aula => aula.idAula == idAula);
}

export const esProfesor = (idUsuario = obtenerIdUsuario()) => {
  return obtenerAula().idUsuario == idUsuario;
};

export const obtenerUsuariosEnAula = (paramIdAula = obtenerIdAula()) => {
  const usuariosAulas = obtenerUsuariosAulas();
  return usuariosAulas.map(([idUsuario, idAula]) => {
    if (idAula == paramIdAula)
      return obtenerUsuario(idUsuario)
  })
}
