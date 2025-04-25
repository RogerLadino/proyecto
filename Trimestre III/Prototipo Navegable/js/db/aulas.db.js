import { obtenerIdUsuario, obtenerUsuario } from "./usuarios.db.js";

export const obtenerIdAula = () => {
  return parseInt(localStorage.getItem("idAula"));
}

export const obtenerAulas = () => {
  return JSON.parse(localStorage.getItem("aulas")) || [];
}

export const obtenerUsuariosAulas = () => {
  return JSON.parse(localStorage.getItem("usuarios_aulas")) || [];
}

export const obtenerAula = (idAula = obtenerIdAula()) => {
  return obtenerAulas().find(aula => aula.idAula == idAula);
}

export const obtenerAulasPorUsuario = (paramIdUsuario = obtenerIdUsuario()) => {
  const usuariosAulas = obtenerUsuariosAulas();

  return usuariosAulas
    .filter(([idUsuario, idAula]) => (idUsuario == paramIdUsuario || paramIdUsuario == obtenerAula(idAula).idUsuario))
    .map(([, idAula]) => obtenerAulas().find(aula => aula.idAula == idAula));
}

export const obtenerAulaSegunCodigo = (codigo) => {
  return obtenerAulas().find(aula => aula.codigo == codigo);
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

export const unirUsuarioAula = (idUsuario = obtenerIdUsuario(), idAula) => {
  const usuariosAulas = obtenerUsuariosAulas();

  usuariosAulas.push([idUsuario, idAula])
  localStorage.setItem("usuarios_aulas", JSON.stringify(usuariosAulas))
}

export const unirseAula = (idUsuario = obtenerIdUsuario(), codigo) => {
  const aula = obtenerAulaSegunCodigo(codigo);

  if(aula.idUsuario == idUsuario) {
    alert("No puedes unirte a tu propia aula")
    return false;
  }
  if(aula == undefined){
    alert("El código de aula no es correcto")
    return false;
  }

  unirUsuarioAula(idUsuario, aula.idAula)  
}