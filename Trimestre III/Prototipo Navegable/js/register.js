// js/register.js
import { DB } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.form');
  
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
      // 1. Limpiar sesión previa (si existe la función)
      if (typeof DB.clearCurrentUser === 'function') {
        DB.clearCurrentUser();
      } else {
        localStorage.removeItem('currentUser'); // Fallback
      }
      
      // 2. Obtener datos del formulario
      const userData = {
        email: document.querySelector('input[type="email"]').value.trim(),
        password: document.querySelector('input[type="password"]').value.trim()
      };
      
      // 3. Validaciones
      if (!userData.email || !userData.password) {
        alert('Email y contraseña son obligatorios');
        return;
      }
      
      // 4. Verificar si el email ya existe
      if (DB.findUserByEmail(userData.email)) {
        alert('Este email ya está registrado');
        return;
      }
      
      // 5. Crear y guardar usuario
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
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