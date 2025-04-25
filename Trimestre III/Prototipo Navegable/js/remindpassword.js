// js/remindpassword.js
import { DB } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const resetData = JSON.parse(localStorage.getItem('resetData'));

  if (!resetData) {
    alert('Solicitud inválida');
    window.location.href = 'password.html';
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newPassword = form.querySelector('input[type="password"]:first-of-type').value;
    const confirmPassword = form.querySelector('input[type="password"]:last-of-type').value;

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const user = DB.users.find(u => u.email === resetData.email);
    if (!user) {
      alert('Usuario no encontrado');
      return;
    }

    user.password = newPassword;
    DB.saveUsers();
    localStorage.removeItem('resetData');
    
    alert('¡Contraseña actualizada!');
    window.location.href = 'login.html';
  });
});