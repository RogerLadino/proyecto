import { esProfesor, obtenerUsuariosEnAula } from '../../db/aulas.db.js';
import { actualizarNota, crearCodigo, obtenerCodigoUsuario } from '../../db/codigo.db.js';
import { obtenerEjercicio, obtenerIdEjercicio } from '../../db/ejercicios.db.js';

const crearFilaTabla = (codigo, usuario) => {
  return `
    <tr class="table-row usuario">
      <td style="display: none;" class="codigo-id">${codigo.idCodigo}</td>
      <td>
        <i class="icon-circle icon-warning"></i>
        ${usuario.nombre1} ${usuario.apellido1}
      </td>
      <td>
        <input type="text" class="underline-input note-input" value="${codigo.notaObtenida}"> /100
      </td>
      <td>
        <div class="attempts">${codigo.intentosRealizados}</div>
      </td>
      <td>
        <div class="checkmark"><i class="icon-cancel"></i></div>
      </td>
      <td>
        <div class="clock"><i class="icon-clock"></i></div>
      </td>
      <td>
        <a href="codigo-profesor.html" class="button-link">
          <button class="card-button"><i class="icon-code"></i> Ver código</button>
        </a>
      </td>
    </tr>
  `;
};

const renderizarTablaCodigos = () => {
  const usuarios = obtenerUsuariosEnAula();

  if(usuarios.length == 0){
    return
  }
  console.log(usuarios)

  const tableBody = document.querySelector('.table-body');
  tableBody.innerHTML = usuarios.map(usuario => {
    const codigo = obtenerCodigoUsuario(usuario.idUsuario)

    // No se muestra el creador de la clase
    if (!esProfesor(usuario.idUsuario)) {
      // Si el usuario no tiene código, se crea uno nuevo
      if (codigo != undefined) {
        return crearFilaTabla(codigo, usuario);
      }

      const nuevoCodigo = crearCodigo(usuario.idUsuario);
      return crearFilaTabla(nuevoCodigo, usuario);
    }
  }).join('');
};

const guardarCalificaciones = () => {
  document.querySelectorAll('.usuario').forEach(usuario => {
    const idCodigo = usuario.querySelector('.codigo-id').innerText;
    const nota = usuario.querySelector('.note-input').value;

    actualizarNota(nota, idCodigo);
  });

  redirigir('lista-ejercicios-profesor.html');
};

const redirigir = (url) => {
  location.href = url;
};

const mostrarTituloEjercicio = () => {
  const idEjercicio = obtenerIdEjercicio();
  const ejercicio = obtenerEjercicio(idEjercicio);

  document.querySelector('.ejercicio-titulo').innerHTML = ejercicio.nombre;
};

renderizarTablaCodigos();
mostrarTituloEjercicio();

document.getElementById('boton-guardar').addEventListener('mousedown', guardarCalificaciones);