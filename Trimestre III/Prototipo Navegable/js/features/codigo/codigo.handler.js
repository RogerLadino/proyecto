import { obtenerIdUsuario, obtenerUsuario } from "../../db/usuarios.db.js";
import { obtenerEjercicio, obtenerIdEjercicio } from "../../db/ejercicios.db.js";
import { obtenerListaCodigos, obtenerCodigo, crearCodigo, editarCodigo, actualizarNota, obtenerIdCodigo, obtenerListaCodigosPorEjercicio } from "../../db/codigo.db.js";
import { esProfesor, obtenerAula } from "../../db/aulas.db.js";
import { mostrarPruebas } from "../pruebas/pruebas.handler.js";
import { editor, cambiarLenguaje } from "./codigo.editor.js";

export const mostrarTituloEjercicio = (titulo) => {
  document.querySelectorAll('.titulo-ejercicio').forEach((elemento) => {
    elemento.innerHTML = titulo;
  });
};

export const mostrarDescripcionEjercicio = (descripcion) => {
  document.querySelector('.descripcion-ejercicio').innerHTML = descripcion;
};

export const mostrarEjercicio = () => {
  const idEjercicio = obtenerIdEjercicio()
  const ejercicio = obtenerEjercicio(idEjercicio);

  mostrarTituloEjercicio(ejercicio.nombre);
  mostrarDescripcionEjercicio(ejercicio.descripcion);
};

export const actualizarCodigo = (idCodigo) => {
  const codigos = obtenerListaCodigos();
  const codigoUsuario = codigos.find(c => c.idCodigo == idCodigo);

  editor.setValue(codigoUsuario.codigo);

  const lenguaje = document.querySelector(".language-select").value;

  editor.getSession().on("change", () => {
    const codigo = editor.getValue();
    editarCodigo(codigo, lenguaje);
  });
};

const cargarCodigo = (idCodigo) => {
  localStorage.setItem("idCodigo", idCodigo);

  const codigoUsuario = obtenerCodigo();

  editor.setValue(codigoUsuario.codigo);
}

const actualizarPermisosDeEdicion = () => {
  const codigoUsuario = obtenerCodigo();
  const idUsuario = obtenerIdUsuario();
  const codeElement = document.getElementById("code");  

  // Si es profesor o el código es del usuario actual, se permite la edición
  if (esProfesor() || codigoUsuario.idUsuario == idUsuario) {
    editor.setReadOnly(false);

    if (esProfesor()) {
      document.querySelector('.note-input').value = codigoUsuario.notaObtenida;
    }
  } else {
    editor.setReadOnly(true);
  }
}

const cargarNombreUsuarioCodigo = () => {
  const codigo = obtenerCodigo()
  const usuario = obtenerUsuario(codigo.idUsuario);
  const nombreUsuario = `${usuario.nombre1} ${usuario.apellido1}`;

  document.querySelector('.nombre-usuario').innerHTML = nombreUsuario;
}

// Esta función se encarga de que el alumno no pueda editar el código del profesor
export const cambiarCodigo = (idCodigo) => {
  cargarCodigo(idCodigo);
  actualizarPermisosDeEdicion(idCodigo);
  cargarNombreUsuarioCodigo();
};

export const mostrarBarraLateral = () => {
  const codigos = obtenerListaCodigosPorEjercicio();
  const sidebar = document.querySelector('.sidebar');

  if (esProfesor()) {
    codigos.forEach(codigo => {
      const usuario = obtenerUsuario(codigo.idUsuario);
      const nombreUsuario = `${usuario.nombre1} ${usuario.apellido1}`;

      sidebar.innerHTML += crearElementoSidebar(codigo.idCodigo, nombreUsuario);
    });

    return;
  }

  const idUsuario = obtenerIdUsuario();
  const idProfesor = obtenerAula().idUsuario;

  codigos.forEach(codigo => {
    if (codigo.idUsuario == idProfesor || codigo.idUsuario == idUsuario) {
      const usuario = obtenerUsuario(codigo.idUsuario);

      sidebar.innerHTML += crearElementoSidebar(codigo.idCodigo, `${usuario.nombre1} ${usuario.apellido1}`);
    }
  });
};

const crearElementoSidebar = (idCodigo, nombre) => {
  return `
    <div class="nav-item" onmousedown="cambiarCodigo(${idCodigo})">
      <i class="icon-circle icon-accent"></i>
      <span>${nombre}</span>
    </div>
  `;
};

export const mostrarNota = () => {
  const elemento = document.querySelector('.note-input');
  const codigo = obtenerCodigo();

  elemento.value = `${codigo.notaObtenida}`;

  elemento.addEventListener('input', (e) => {
    const nota = e.target.value;
    actualizarNota(nota);
  });
};

export const mostrarCodigo = () => {
  const idUsuario = obtenerIdUsuario();
  const idEjercicio = obtenerIdEjercicio();
  const codigos = obtenerListaCodigos();

  let codigoUsuario = codigos.find(c => c.idUsuario == idUsuario && c.idEjercicio == idEjercicio) || crearCodigo();
  localStorage.setItem("idCodigo", codigoUsuario.idCodigo);
};


const configurarTabs = () => {
  const tabs = document.querySelectorAll(".tab-container .editor-title-item");
  const tabContents = document.querySelectorAll(".tab-content > div");

  if (tabs.length === 0 || tabContents.length === 0) return;

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activarTab(tabs, tabContents, index);
    });
  });

  activarTab(tabs, tabContents, 0);
};

const activarTab = (tabs, tabContents, index) => {
  tabs.forEach(t => {
    t.classList.remove("active-tab");
    const icon = t.querySelector("i");
    if (icon) icon.className = "icon-circle-empty icon-accent";
  });

  tabContents.forEach(content => content.style.display = "none");

  const tab = tabs[index];
  tab.classList.add("active-tab");
  const icon = tab.querySelector("i");
  if (icon) icon.className = "icon-circle icon-accent";

  tabContents[index].style.display = "flex";
};

const configurarLenguaje = () => {
  const select = document.querySelector(".language-select");

  select.addEventListener("change", (e) => {
    const lenguaje = e.target.value;
    
    cambiarLenguaje(lenguaje);
  });
}

export const mostrarInterfaz = () => {
  configurarLenguaje()
  mostrarCodigo();
  mostrarBarraLateral();
  mostrarEjercicio();
  actualizarCodigo(obtenerIdCodigo());
  cargarNombreUsuarioCodigo();
  configurarTabs();
  mostrarPruebas()
};