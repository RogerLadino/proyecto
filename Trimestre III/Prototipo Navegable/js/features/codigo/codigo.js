import { mostrarPruebas } from '../pruebas/pruebas.handler.js'
import { mostrarInterfaz, cambiarCodigo} from './codigo.handler.js'

const idUsuario = localStorage.getItem('idUsuario')

mostrarInterfaz(idUsuario) 

// Exportar la función para que esté disponible en el contexto global
window.cambiarCodigo = cambiarCodigo