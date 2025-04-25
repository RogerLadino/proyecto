import { obtenerEjercicio, obtenerIdEjercicio } from "../../db/ejercicios.db.js";
import { mostrarInterfaz, mostrarNota, cambiarCodigo} from './codigo.handler.js'
import { mostrarPruebas } from '../pruebas/pruebas.handler.js';

const ejercicio = obtenerEjercicio(obtenerIdEjercicio());

document.querySelector(".ejercicio-titulo").innerHTML = ejercicio.nombre;

mostrarInterfaz()
mostrarNota()
mostrarPruebas()

// Exportar la función para que esté disponible en el contexto global
window.cambiarCodigo = cambiarCodigo