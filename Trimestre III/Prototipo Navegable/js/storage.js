// js/storage.js
export const DB = {
    users: JSON.parse(localStorage.getItem('usersDB')) || [],
    
    // Guardar usuarios en localStorage
    saveUsers() {
      localStorage.setItem('usersDB', JSON.stringify(this.users));
    },
    
    // Establecer usuario actual
    setCurrentUser(user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
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
        user.email && 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.password === password
      );
    },
    
    // Limpiar todos los datos (útil para pruebas)
    clearAll() {
      this.users = [];
      localStorage.clear();
    }
  };