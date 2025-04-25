// js/register.js
import { DB } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.form');
  
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
      const userData = {
        correo: document.querySelector('input[type="email"]').value.trim(),
        contraseña: document.querySelector('input[type="password"]').value.trim(),
        nombre1: document.querySelector('input#nombre1').value.trim(),
        nombre2: document.querySelector('input#nombre2').value.trim(),
        apellido1: document.querySelector('input#apellido1').value.trim(),
        apellido2: document.querySelector('input#apellido2').value.trim(),
      };
      
      // 4. Verificar si el email ya existe
      if (DB.findUserByEmail(userData.email)) {
        alert('Este email ya está registrado');
        return;
      }
      
      // 5. Crear y guardar usuario
      const newUser = {
        idUsuario: Date.now(),
        ...userData,
      };
      
      DB.users.push(newUser);
      DB.saveUsers();
      
      // 6. Redirección explícita a login
      alert('¡Registro exitoso! Serás redirigido para iniciar sesión.');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
      
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Error durante el registro. Por favor intente nuevamente.');
    }
  });
});