document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos del DOM
    const inputNombreClase = document.querySelector(".campo input");
    const tituloClase = document.querySelector(".titulo h1");
    const botonCrear = document.querySelector(".boton-guardar");
  
    // Verificación de existencia de elementos antes de proceder
    if (!inputNombreClase || !tituloClase || !botonCrear) {
      console.error("No se encontraron los elementos en el DOM.");
      return;
    }
  
    // Actualizar el título de la clase en tiempo real
    inputNombreClase.addEventListener("input", () => {
      tituloClase.textContent = inputNombreClase.value.trim() || "Crear Clase";
    });
  
    // Manejo del evento al hacer clic en "Crear"
    botonCrear.addEventListener("click", (event) => {
      event.preventDefault(); // Evita la redirección inmediata
  
      const nombreClase = inputNombreClase.value.trim();
  
      if (!nombreClase) {
        alert("Por favor, ingresa un nombre válido para la clase.");
        return;
      }
  
      // Guardar el nombre de la clase en localStorage
      localStorage.setItem("nuevaClase", nombreClase);
      console.log("Clase creada:", nombreClase);
  
      // Feedback visual en el botón
      botonCrear.textContent = "Guardado!";
      setTimeout(() => botonCrear.textContent = "Crear", 2000);
  
      // Redirigir después de un breve tiempo
      setTimeout(() => {
        window.location.href = "clases.html";
      }, 1000);
    });
  });