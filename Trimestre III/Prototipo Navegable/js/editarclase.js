document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos en la página
    const inputNombreClase = document.querySelector(".campo input");
    const tituloClase = document.querySelector(".titulo h1"); 
    const botonGuardar = document.querySelector(".boton-guardar");
    const botonBorrar = document.querySelector(".boton-borrar");
  
    // Si los elementos existen, proceder
    if (!inputNombreClase || !tituloClase || !botonGuardar || !botonBorrar) {
      console.error("Error: No se encontraron los elementos en el DOM.");
      return;
    }
  
    // Cargar nombre de la clase guardado previamente
    const nombreGuardado = localStorage.getItem("nuevaClase");
    if (nombreGuardado) {
      actualizarClase(nombreGuardado);
    }
  
    // Actualizar el título de la clase en tiempo real
    inputNombreClase.addEventListener("input", () => {
      actualizarClase(inputNombreClase.value.trim());
    });
  
    // Guardar el nombre de la clase en localStorage y redirigir
    botonGuardar.addEventListener("click", (event) => {
      event.preventDefault();
      const nuevoNombre = inputNombreClase.value.trim();
  
      if (!nuevoNombre) {
        return alert("Por favor, ingresa un nombre válido.");
      }
  
      localStorage.setItem("nuevaClase", nuevoNombre);
      actualizarClase(nuevoNombre);
      alert(`Clase guardada con el nombre: ${nuevoNombre}`);
      
      setTimeout(() => window.location.href = "lista-ejercicios-profesor.html", 1000);
    });
  
    // Borrar clase almacenada
    botonBorrar.addEventListener("click", (event) => {
      event.preventDefault();
  
      if (!localStorage.getItem("nuevaClase")) {
        return alert("No hay una clase guardada para eliminar.");
      }
  
      localStorage.removeItem("nuevaClase");
      actualizarClase("");
      alert("Clase eliminada correctamente.");
    });
  
    // Función para actualizar el título de la clase
    function actualizarClase(nombre) {
      tituloClase.textContent = nombre || "Editar Clase";
      inputNombreClase.value = nombre;
    }
  });