import { generarCodigoAleatorio } from "../utils/codigoAlAzar.js";
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

export const obtenerAulasPertenecientes = (paramIdUsuario = obtenerIdUsuario()) => {
  const usuariosAulas = obtenerUsuariosAulas();

  return usuariosAulas
    .filter(([idUsuario]) => (idUsuario == paramIdUsuario))
    .map(([, idAula]) => obtenerAulas().find(aula => aula.idAula == idAula));
}

export const obtenerAulasDictadas = (paramIdUsuario = obtenerIdUsuario()) => {
  return obtenerAulas().filter(aula => aula.idUsuario == paramIdUsuario);
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
  }) || []
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

export const crearAula = (nombre) => {
  const clases = obtenerAulas();

  const nuevaClase = {
    idAula: clases.length > 0 ? clases[clases.length - 1].idAula + 1 : 0,
    nombre: nombre,
    codigo: generarCodigoAleatorio(),
    idUsuario: obtenerIdUsuario(),
  };

  clases.push(nuevaClase);

  localStorage.setItem("aulas", JSON.stringify(clases));

  return nuevaClase
}

export const editarAula = (idAula = obtenerIdAula(), nombre) => {
  const aulas = obtenerAulas();

  const aulaIndex = aulas.findIndex(aula => aula.idAula == idAula);

  aulas[aulaIndex].nombre = nombre;

  localStorage.setItem("aulas", JSON.stringify(aulas));
}

export const eliminarAula = (idAula = obtenerIdAula()) => {
  const aulas = obtenerAulas();

  const nuevasAulas = aulas.filter(aula => aula.idAula != idAula );

  localStorage.setItem('aulas', JSON.stringify(nuevasAulas)); 
}