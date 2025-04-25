export const obtenerIdUsuario = () => {
  return parseInt(localStorage.getItem("idUsuario")) || 0;
}

export const obtenerUsuario = (idUsuario = obtenerIdUsuario()) => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios.find(usuario => usuario.idUsuario == idUsuario);
}