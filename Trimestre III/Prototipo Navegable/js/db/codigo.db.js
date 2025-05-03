import { obtenerIdUsuario } from "./usuarios.db.js";
import { obtenerEjercicio, obtenerIdEjercicio } from "./ejercicios.db.js";
import { obtenerIdAula } from "./aulas.db.js";

export const obtenerIdCodigo = () => {
  return parseInt(localStorage.getItem("idCodigo"));
}

export const obtenerListaCodigos = () => {
  return JSON.parse(localStorage.getItem("codigos")) || [];
}

export const obtenerListaCodigosPorEjercicio = (idEjercicio = obtenerIdEjercicio()) => {
  const codigos = obtenerListaCodigos();

  const codigosAula = codigos.filter(c => c.idEjercicio == idEjercicio)

  return codigosAula
}

export const obtenerCodigo = () => {
  const idCodigo = obtenerIdCodigo()

  const codigos = obtenerListaCodigos();

  const codigoUsuario = codigos.find(c => c.idCodigo == idCodigo)

  return codigoUsuario
}

export const obtenerCodigoUsuario = (idUsuario) => {
  const idEjercicio = obtenerIdEjercicio()

  const codigos = obtenerListaCodigos();

  const codigoUsuario = codigos.find(c => c.idUsuario == idUsuario && c.idEjercicio == idEjercicio)

  return codigoUsuario
}

export const crearItemCodigo = (idUsuario = obtenerIdUsuario()) => {
  const codigos = obtenerListaCodigos();

  const idEjercicio = obtenerIdEjercicio()
  const idAula = obtenerIdAula()

  const ejercicio = obtenerEjercicio(idEjercicio)

  const idCodigo = codigos[codigos.length - 1] ? codigos[codigos.length - 1].idCodigo + 1 : 0

  const nuevoCodigo = {
    idCodigo: idCodigo,
    codigo: ejercicio.codigoInicial,
    notaObtenida: 0,
    resuelto: false,
    intentosRealizados: 0,
    lenguaje: '',
    idEjercicio: idEjercicio,
    idAula: idAula,
    idUsuario: parseInt(idUsuario),
  }

  return nuevoCodigo
}

export const crearCodigo = (idUsuario = obtenerIdUsuario()) => {
  const idCodigo = obtenerIdCodigo()
  const codigos = obtenerListaCodigos();
  const nuevoCodigo = crearItemCodigo(idUsuario) 

  codigos.push(nuevoCodigo)

  localStorage.setItem("idCodigo", idCodigo);
  localStorage.setItem("codigos", JSON.stringify(codigos));

  return nuevoCodigo
}

export const editarCodigo = (codigo, lenguaje) => {
  const idCodigo = obtenerIdCodigo()

  let codigos = obtenerListaCodigos();

  codigos = codigos.map(c => {
    if (c.idCodigo == idCodigo) {
      c.codigo = codigo
      c.lenguaje = lenguaje
    }
    return c
  })

  localStorage.setItem("codigos", JSON.stringify(codigos));
}

export const ejecutarCodigo = () => {
  const idCodigo = obtenerIdCodigo()

  const codigos = obtenerListaCodigos();

  const codigoEjecutado = codigos.find(c => c.idCodigo == idCodigo)

  if (codigoEjecutado) {
    codigoEjecutado.intentosRealizados += 1
  }

  localStorage.setItem("codigos", JSON.stringify(codigos));

  return codigoEjecutado
}

export const actualizarNota = (nota, idCodigo = obtenerIdCodigo()) => {
  let codigos = obtenerListaCodigos();

  codigos = codigos.map(codigo => {
    if (codigo.idCodigo == idCodigo) {
      codigo.notaObtenida = nota
    }
    return codigo
  })

  localStorage.setItem("codigos", JSON.stringify(codigos));
}