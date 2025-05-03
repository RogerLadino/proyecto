import { obtenerPruebasPorEjercicio, editarPrueba, crearPrueba } from "../../db/pruebas.db.js";
import { parsearValorParametro, obtenerNombreDeTipoDeParametro } from "../../utils/parametros.js";

const crearOpcionesSelect = (tipoSeleccionado) => {
  const tipos = ['int', 'string', 'float', 'boolean', 'json'];
  return tipos.map(tipo => `
    <option value="${tipo}" ${tipo === tipoSeleccionado ? 'selected' : ''}>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
  `).join('');
};

const crearContenedorParametro = (tipoParametro, valorParametro) => `
  <div class="param-row parametro">
    <select class="param-select tipo-parametro">
      ${crearOpcionesSelect(tipoParametro)}
    </select>
    <div class="param-value-container">
      <input type="text" value="${valorParametro}" class="valor-parametro">
      <i class="icon-cancel" onmousedown="eliminarElementoPrueba(event)"></i>
    </div>
  </div>
`;

const crearSalidaHTML = (tipoParametro, valorRetorno) => `
  <div class="param-header">
    <span>Debe retornar</span>
  </div>
  <div class="param-grid">
    <div class="param-grid-header">
      <span>Tipo</span>
      <span>Valor</span>
    </div>
    <div class="param-row">
      <select class="param-select tipo-retorno">
        ${crearOpcionesSelect(tipoParametro)}
      </select>
      <div class="param-value-container">
        <input type="text" value="${valorRetorno}" class="valor-retorno">
      </div>
    </div>
  </div>
`;

export const obtenerParametrosDesdeHTML = (prueba) => {
  const parametros = Array.from(prueba.querySelectorAll('.parametro')).map(parametro => {
    const valorParametro = parametro.querySelector('.valor-parametro').value;
    const tipoParametro = parametro.querySelector('.tipo-parametro').value;
    return parsearValorParametro(tipoParametro, valorParametro);
  });
  return JSON.stringify(parametros);
};

export const obtenerSalidaDesdeHTML = (prueba) => {
  const valorRetorno = prueba.querySelector('.valor-retorno').value;
  const tipoParametro = prueba.querySelector('.tipo-retorno').value;
  return JSON.stringify(parsearValorParametro(tipoParametro, valorRetorno));
};

export const guardarPruebas = (idEjercicio) => {
  document.querySelectorAll('.prueba').forEach(prueba => {
    
    const nombreFuncion = prueba.querySelector('.nombre-funcion').value;
    const entrada = obtenerParametrosDesdeHTML(prueba);
    const salida = obtenerSalidaDesdeHTML(prueba);

    try {
      const idPrueba = prueba.querySelector('.id-prueba').innerHTML;
      editarPrueba(parseInt(idPrueba), nombreFuncion, entrada, salida);
    } catch {
      crearPrueba(idEjercicio, nombreFuncion, entrada, salida);
    }
  });
};

export const crearElementoPrueba = () => {
  const elemento = `
    <div class="test-accordion prueba">
      <div class="test-header">
        <div class="test-title">
          <span>Función: </span>
          <input type="text" class="underline-input nombre-funcion" placeholder="nombre de la función">
        </div>
        <i class="icon-trash" onmousedown="eliminarElementoPrueba(event)"></i>
      </div>
      ${mostrarParametros('[]', '1')}
    </div>
  `;
  document.querySelector('.pruebas').innerHTML += elemento;
};

export const mostrarParametros = (parametrosJSON, salidaJSON) => {
  const parametros = JSON.parse(parametrosJSON);
  const listaParametros = parametros.map(parametro => crearContenedorParametro(obtenerNombreDeTipoDeParametro(parametro), parametro)).join('');
  const tablaSalida = crearSalidaHTML(obtenerNombreDeTipoDeParametro(JSON.parse(salidaJSON)), JSON.parse(salidaJSON));

  return `
    <div class="test-content">
      <div class="param-header">
        <span>Parámetros</span>
        <i class="icon-plus" onmousedown="crearElementoParametro(event)"></i>
      </div>
      <div class="param-grid parametros">
        <div class="param-grid-header">
          <span>Tipo</span>
          <span>Valor</span>
        </div>
        ${listaParametros}
      </div>
    </div>
    <div class="test-content">
      ${tablaSalida}
    </div>
  `;
};

export const cargarPruebas = () => {
  const pruebas = obtenerPruebasPorEjercicio(localStorage.getItem('idEjercicio'));

  pruebas.forEach(prueba => {
    const elemento = `
      <div class="test-accordion prueba">
        <div class="id-prueba" style="display: none;">${prueba.idPrueba}</div>
        <div class="test-header">
          <div class="test-title">
            <span>Función: </span>
            <input type="text" class="underline-input nombre-funcion" value="${prueba.nombreFuncion}">
          </div>
          <i class="icon-trash" onmousedown="eliminarElementoPrueba(event)"></i>
        </div>
        ${mostrarParametros(prueba.entrada, prueba.salida)}
      </div>
    `;
    document.querySelector('.pruebas').innerHTML += elemento;
  });
};

export const eliminarElementoPrueba = (event) => {
  event.target.closest('.prueba').remove();
};

export const crearElementoParametro = (event) => {
  const contenedor = event.target.closest('.test-content').querySelector('.parametros');
  contenedor.innerHTML += crearContenedorParametro('string', '');
};

export const mostrarPruebas = () => {
  const pruebas = obtenerPruebasPorEjercicio(localStorage.getItem('idEjercicio'));
  const element = document.querySelector('.pruebas');

  pruebas.forEach(prueba => {
    const argumentos = JSON.parse(prueba.entrada).map(parametro => `
      <tr class="table-row">
        <td>${obtenerNombreDeTipoDeParametro(parametro)}</td>
      </tr>
    `).join('');

    element.innerHTML += `
      <table class="tabla-pruebas">
        <thead class="table-header">
          <th>Función: ${prueba.nombreFuncion}</th>
        </thead>
        <thead>
          <tr class="table-header">
            <th>Argumentos</th>
          </tr>
        </thead>
        <tbody class="table-body">
          ${argumentos}
        </tbody>
        <thead>
          <tr class="table-header">
            <th>Debe retornar un valor de tipo: </th>
          </tr>
          <tr class="table-row">
            <td>${obtenerNombreDeTipoDeParametro(JSON.parse(prueba.salida))}</td>
          </tr>
        </thead>
      </table>
    `;
  });
};