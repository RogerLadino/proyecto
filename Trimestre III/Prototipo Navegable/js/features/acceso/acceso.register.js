import { buscarUsuarioPorCorreo } from "../../db/acceso.db.js";
import { crearUsuario } from "../../db/usuarios.db.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.form");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      // 1. Obtener datos del formulario
      const correo = document.querySelector('input[type="email"]').value.trim()
      const contraseña = document.querySelector('input[type="password"]').value.trim()
      const nombre1 = document.querySelector("input#nombre1").value.trim()
      const nombre2 = document.querySelector("input#nombre2").value.trim()
      const apellido1 = document.querySelector("input#apellido1").value.trim()
      const apellido2 = document.querySelector("input#apellido2").value.trim()

      // 2. Validar si el email ya está registrado
      if (buscarUsuarioPorCorreo(correo)) {
        alert("Este email ya está registrado");
        return;
      }

      crearUsuario(correo, nombre1, nombre2, apellido1, apellido2, contraseña);

      // 5. Redirección explícita a login
      alert("¡Registro exitoso! Serás redirigido para iniciar sesión.");
      
      location.href = "login.html"
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error durante el registro. Por favor intente nuevamente.");
    }
  });
});