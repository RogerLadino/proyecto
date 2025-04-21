document.addEventListener("DOMContentLoaded", function () {
  const inputNombreClase = document.querySelector(".campo input");
  const tituloClase = document.querySelector(".titulo h1"); // Título principal de la clase
  const botonGuardar = document.querySelector(".boton-guardar");
  const botonBorrar = document.querySelector(".boton-borrar");

  if (inputNombreClase && tituloClase && botonGuardar && botonBorrar) {
      // Cargar el nombre de la clase almacenado al abrir la página
      const nombreGuardado = localStorage.getItem("nuevaClase");
      if (nombreGuardado) {
          inputNombreClase.value = nombreGuardado;
          tituloClase.textContent = nombreGuardado; // Reflejarlo de inmediato
      }
      // Actualizar el título en tiempo real al escribir en el campo
      inputNombreClase.addEventListener("input", () => {
          tituloClase.textContent = inputNombreClase.value.trim() || "Editar Clase";
      });
      // Guardar cambios al hacer clic en "Guardar"
      botonGuardar.addEventListener("click", function (event) {
          event.preventDefault();
          const nuevoNombre = inputNombreClase.value.trim();
          if (!nuevoNombre) {
              alert("Por favor, ingresa un nombre válido.");
              return;
          }
          localStorage.setItem("nuevaClase", nuevoNombre);
          tituloClase.textContent = nuevoNombre; // Reflejar el cambio inmediato

          alert(`Clase guardada con el nombre: ${nuevoNombre}`);
          setTimeout(() => {
              window.location.href = "lista-ejercicios-profesor.html"; // Redirigir después de ver el mensaje
          }, 1000);
      });

      // Borrar clase al hacer clic en "Borrar"
      botonBorrar.addEventListener("click", function (event) {
          event.preventDefault();

          if (localStorage.getItem("nuevaClase")) {
              localStorage.removeItem("nuevaClase");
              inputNombreClase.value = "";
              tituloClase.textContent = "Editar Clase"; // Restablecer el título
              alert("Clase eliminada correctamente.");
          } else {
              alert("No hay una clase guardada para eliminar.");
          }
      });

      // Cambio visual en el botón de guardar
      botonGuardar.addEventListener("click", () => {
          botonGuardar.textContent = "Guardado!";
          setTimeout(() => botonGuardar.textContent = "Guardar", 2000);
      });
  } else {
      console.error("Error: No se encontraron los elementos en el DOM.");
  }
});