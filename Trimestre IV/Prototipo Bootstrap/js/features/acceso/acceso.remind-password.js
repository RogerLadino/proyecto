import { buscarUsuarioPorCorreo } from "../../db/acceso.db.js";
import { actualizarContraseña } from "../../db/usuarios.db.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const resetData = JSON.parse(localStorage.getItem("resetData"));

  if (!resetData) {
    alert("Solicitud inválida");
    window.location.href = "password.html";
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPassword = form.querySelector('input[type="password"]:first-of-type').value.trim();
    const confirmPassword = form.querySelector('input[type="password"]:last-of-type').value.trim();

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const user = buscarUsuarioPorCorreo(resetData.email);

    if (!user) {
      alert("Usuario no encontrado");
      return;
    }

    actualizarContraseña(user.idUsuario, newPassword)

    // Eliminar los datos de restablecimiento
    localStorage.removeItem("resetData");

    alert("¡Contraseña actualizada!");
    window.location.href = "login.html";
  });
});