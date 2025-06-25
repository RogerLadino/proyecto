import { obtenerUsuarios } from "./usuarios.db.js";

export const validarCredenciales = (correo, contraseña) => {
    if (!correo || !contraseña) return null;

    const usuarios = obtenerUsuarios();
    return usuarios.find(usuario =>
        usuario.correo &&
        usuario.correo.toLowerCase() === correo.toLowerCase() &&
        usuario.contraseña == contraseña
    );
};

export const buscarUsuarioPorCorreo = (correo) => {
    const usuarios = obtenerUsuarios();
    return usuarios.find(usuario => usuario.correo == correo);
};