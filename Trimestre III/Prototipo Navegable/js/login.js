// js/login.js
import { DB } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
      // 1. Obtener valores de los inputs
      const email = document.getElementById('user-email').value.trim();
      const password = document.getElementById('user-password').value.trim();
      
      // 2. Validar campos
      if (!email || !password) {
        alert('Por favor complete todos los campos');
        return;
      }
      
      // 3. Validar credenciales (USANDO LA NUEVA FUNCIÓN)
      const user = DB.validateCredentials(email, password);
      
      if (!user) {
        alert('Email o contraseña incorrectos');
        return;
      }
      
      // 4. Establecer sesión
      DB.setCurrentUser(user);
      console.log('Usuario autenticado:', user);
      
      // 5. Redirección
      alert('¡Bienvenido! Redirigiendo...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
      
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error inesperado. Por favor intente nuevamente.');
    }
  });
});