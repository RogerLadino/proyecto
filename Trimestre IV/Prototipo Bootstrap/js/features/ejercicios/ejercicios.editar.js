import { obtenerIdEjercicio, obtenerEjercicio, editarEjercicio, eliminarEjercicio as eliminarEjercicioDB } from '../../db/ejercicios.db.js';
import { guardarPruebas, cargarPruebas, eliminarElementoPrueba, crearElementoParametro, crearElementoPrueba } from '../pruebas/pruebas.handler.js';

const actualizarElementos = ({ nombre, descripcion, fecha, codigoInicial }) => {
  document.getElementById('nombre').value = nombre;
  document.getElementById('descripcion').value = descripcion;
  document.getElementById('fecha-entrega').value = fecha;
  document.getElementById('codigo-inicial').value = codigoInicial;
};

const guardarEjercicio = () => {
  const idEjercicio = obtenerIdEjercicio();
  const ejercicio = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    codigoInicial: document.getElementById('codigo-inicial').value,
    fechaEntrega: document.getElementById('fecha-entrega').value,
  };

  editarEjercicio(idEjercicio, ejercicio.nombre, ejercicio.descripcion, ejercicio.codigoInicial, ejercicio.fechaEntrega);
  guardarPruebas(idEjercicio);

  redirigir('ejercicio-profesor.html');
};

const eliminarEjercicio = () => {
  eliminarEjercicioDB(localStorage.getItem('idEjercicio'));

  redirigir('lista-ejercicios-profesor.html');
};

const redirigir = (url) => {
  location.href = url;
};

const idEjercicio = obtenerIdEjercicio();
const ejercicio = obtenerEjercicio(idEjercicio);

actualizarElementos(ejercicio);
cargarPruebas(ejercicio.nombre, ejercicio.descripcion, ejercicio.fecha, ejercicio.codigoInicial);

document.querySelector('.boton-guardar').addEventListener('click', guardarEjercicio);
document.querySelector('.boton-borrar').addEventListener('click', eliminarEjercicio);

// Se usa window para que la función sea accesible desde el HTML
window.crearElementoPrueba = crearElementoPrueba
window.crearElementoParametro = crearElementoParametro
window.eliminarElementoPrueba = eliminarElementoPrueba