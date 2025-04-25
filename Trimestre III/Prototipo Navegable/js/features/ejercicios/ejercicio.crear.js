import { crearEjercicio } from "../../db/ejercicios.db.js";
import { guardarPruebas, crearElementoPrueba, crearElementoParametro, eliminarElementoPrueba } from "../pruebas/pruebas.handler.js";

document.getElementById('boton-crear-ejercicio').addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const codigoInicial = document.getElementById('codigo-inicial').value;
  const fechaEntrega = document.getElementById('fecha-entrega').value;

  const idEjercicio = crearEjercicio(nombre, descripcion, codigoInicial, fechaEntrega);
  guardarPruebas(idEjercicio)

  location.href = "lista-ejercicios-profesor.html";
})

// Se usa window para que la función sea accesible desde el HTML
window.crearElementoPrueba = crearElementoPrueba
window.crearElementoParametro = crearElementoParametro
window.eliminarElementoPrueba = eliminarElementoPrueba