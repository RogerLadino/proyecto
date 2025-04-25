// js/storage.js
export const DB = {
    users: JSON.parse(localStorage.getItem('usuarios')) || [],
    
    // Guardar usuarios en localStorage
    saveUsers() {
      localStorage.setItem('usuarios', JSON.stringify(this.users));
    },
    
    // Establecer usuario actual
    setCurrentUser(user) {
      localStorage.setItem('idUsuario', parseInt(user.idUsuario));
    },
    
    // Obtener usuario actual
    getCurrentUser() {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    },
    
    // Función para autenticar usuario (REEMPLAZO de authenticateUser)
    validateCredentials(email, password) {
      if (!email || !password) return null;
      
      return this.users.find(user => 
        user.correo&& 
        user.correo.toLowerCase() === email.toLowerCase() && 
        user.contraseña === password 
      );
    },

    findUserByEmail(email){
      return this.users.find(user => user.correo == email);
    },
    
    // Limpiar todos los datos (útil para pruebas)
    clearAll() {
      this.users = [];
      localStorage.clear();
    }
  };