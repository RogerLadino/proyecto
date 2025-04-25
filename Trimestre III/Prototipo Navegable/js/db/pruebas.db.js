export const obtenerPruebas = () => {
  const pruebas = localStorage.getItem('pruebas');
  if (pruebas == null) {
    return [];
  } else {
    return JSON.parse(pruebas);
  }
}

export const obtenerPruebasPorEjercicio = (idEjercicio) => {
  const pruebas = obtenerPruebas();
  return pruebas.filter(prueba => prueba.idEjercicio == idEjercicio);
}

export const editarPrueba = (idPrueba, nombreFuncion, entrada, salida) => {
  let pruebas = obtenerPruebas();

  pruebas = pruebas.map(prueba => {
    if (prueba.idPrueba == idPrueba) {
      return {
        idPrueba: prueba.idPrueba,
        nombreFuncion: nombreFuncion,
        entrada: entrada,
        salida: salida,
        idEjercicio: prueba.idEjercicio
      }
    } else {
      return prueba;
    }
  });

  localStorage.setItem('pruebas', JSON.stringify(pruebas));
}

export const crearPrueba = (idEjercicio, nombreFuncion, entrada, salida) => {
  const pruebas = obtenerPruebas();

  const nuevaPrueba = {
    idPrueba: pruebas[pruebas.length - 1] ? pruebas[pruebas.length - 1].idPrueba + 1 : 0,
    nombreFuncion: nombreFuncion,
    entrada: entrada,
    salida: salida,
    idEjercicio: idEjercicio
  };
  pruebas.push(nuevaPrueba);

  localStorage.setItem('pruebas', JSON.stringify(pruebas));
}