import { obtenerIdAula } from "./aulas.db.js";

export const obtenerIdEjercicio = () => {
  return parseInt(localStorage.getItem("idEjercicio"));
}

export const obtenerListaEjercicios = () => {
  if (localStorage.getItem('ejercicios') == null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem('ejercicios'));
  }
}

export const obtenerListaEjerciciosPorAula = (idAula = obtenerIdAula()) => {
  const ejercicios = obtenerListaEjercicios();

  return ejercicios.filter(ejercicio => ejercicio.idAula == idAula);
}

export const obtenerEjercicio = (idEjercicio = obtenerIdEjercicio()) => {
  return obtenerListaEjercicios().find(ejercicio => ejercicio.idEjercicio == idEjercicio);
}

export const crearEjercicio = (nombre, descripcion, codigoInicial, fechaEntrega) => {
  const ejercicios = obtenerListaEjercicios();

  const idEjercicio = ejercicios.length > 0 ? ejercicios[ejercicios.length - 1].idEjercicio + 1 : 0

  const nuevoEjercicio = {
    idEjercicio: idEjercicio,
    nombre: nombre,
    descripcion: descripcion,
    codigoInicial: codigoInicial,
    fechaEntrega: fechaEntrega,
    idAula: obtenerIdAula()
  };

  ejercicios.push(nuevoEjercicio);

  localStorage.setItem('ejercicios', JSON.stringify(ejercicios));

  return idEjercicio
}

export const eliminarEjercicio = (idEjercicio) => {
  const ejercicios = obtenerListaEjercicios();

  const nuevoEjercicio = ejercicios.filter(ejercicio => ejercicio.idEjercicio != idEjercicio);

  localStorage.setItem('ejercicios', JSON.stringify(nuevoEjercicio));
}

export const editarEjercicio = (idEjercicio, nombre, descripcion, codigoInicial, fechaEntrega) => {
  let ejercicios = obtenerListaEjercicios();

  ejercicios = ejercicios.map(ejercicio => {
    if (ejercicio.idEjercicio == idEjercicio) {
      return {
        idEjercicio: idEjercicio,
        nombre: nombre,
        descripcion: descripcion,
        codigoInicial: codigoInicial,
        fechaEntrega: fechaEntrega,
        idAula: ejercicio.idAula
      };
    } else {
      return ejercicio;
    }
  });

  localStorage.setItem('ejercicios', JSON.stringify(ejercicios));
}