// js/password.js
import { DB } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('recovery-email');
  const codeInputs = Array.from(document.querySelectorAll('.code-inputs input'));
  const sendCodeBtn = document.getElementById('send-code-btn');
  const verifyCodeBtn = document.getElementById('verify-code-btn');

  // Auto-enfoque entre inputs de código
  codeInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
      verifyCodeBtn.disabled = !codeInputs.every(i => i.value.length === 1);
    });
  });

  // Enviar código
  sendCodeBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    
    if (!email) {
      alert('Ingrese un email válido');
      return;
    }

    if (!DB.users.some(u => u.email === email)) {
      alert('No hay cuenta registrada con este email');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('resetData', JSON.stringify({
      email,
      code,
      expires: Date.now() + 3600000 // 1 hora de validez
    }));

    console.log(`Código para ${email}: ${code}`);
    alert(`Código enviado a ${email} (ver consola)`);
    
    // Habilitar inputs y cambiar estados
    codeInputs.forEach(input => input.disabled = false);
    codeInputs[0].focus();
    verifyCodeBtn.disabled = true;
    emailInput.disabled = true;
    sendCodeBtn.disabled = true;
    sendCodeBtn.textContent = 'Reenviar Código';
  });

  // Verificar código
  verifyCodeBtn.addEventListener('click', () => {
    const enteredCode = codeInputs.map(input => input.value).join('');
    const resetData = JSON.parse(localStorage.getItem('resetData'));

    if (!resetData || resetData.code !== enteredCode) {
      alert('Código incorrecto');
      return;
    }

    if (Date.now() > resetData.expires) {
      alert('Código expirado. Solicite uno nuevo.');
      return;
    }

    window.location.href = 'remindpassword.html';
  });
});