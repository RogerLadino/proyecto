export const obtenerIdUsuario = () => {
  return parseInt(localStorage.getItem("idUsuario")) || 0;
}

export const obtenerUsuario = (idUsuario = obtenerIdUsuario()) => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios.find(usuario => usuario.idUsuario == idUsuario);
}

export const obtenerUsuarios = () => JSON.parse(localStorage.getItem('usuarios')) || [];

export const establecerUsuarioActual = (usuario) => {
  localStorage.setItem('idUsuario', parseInt(usuario.idUsuario));
};

export const obtenerUsuarioActual = () => {
  const usuario = localStorage.getItem('currentUser');
  return usuario ? JSON.parse(usuario) : null;
};

export const crearUsuario = (correo, nombre1, nombre2, apellido1, apellido2, contraseña) => {
  const newUser = {
    idUsuario: Date.now(),
    correo,
    nombre1,
    nombre2,
    apellido1,
    apellido2,
    contraseña,
  };

  const usuarios = obtenerUsuarios();
  usuarios.push(newUser);
  console.log(usuarios)

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return newUser;
}

export const actualizarContraseña = (idUsuario, contraseña) => {
  const usuarios = obtenerUsuarios();

  const nuevosUsuarios = usuarios.map(usuario => {
    if (usuario.idUsuario == idUsuario) {
      return { ...usuario, contraseña };
    }
    return usuario;
  })

  localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
}