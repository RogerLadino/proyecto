document.addEventListener("DOMContentLoaded", function () {
  const inputNombreClase = document.querySelector(".campo input");
  const botonCrear = document.querySelector(".boton-guardar");

  if (inputNombreClase && botonCrear) {
      botonCrear.addEventListener("click", function (event) {
          event.preventDefault(); // Evita que el enlace redirija inmediatamente

          const nombreClase = inputNombreClase.value.trim();

          if (!nombreClase) {
              alert("Por favor, ingresa un nombre válido para la clase.");
              return;
          }
          // Guardar en localStorage
          localStorage.setItem("nuevaClase", nombreClase);
          console.log("Clase creada:", nombreClase);

          // Mensaje visual de guardado
          botonCrear.textContent = "Guardado!";
          setTimeout(() => botonCrear.textContent = "Crear", 2000);

          // Redirigir después de un breve tiempo
          setTimeout(() => {
              window.location.href = "clases.html";
          }, 1000);
      });

      // Mostrar el nombre de la clase en tiempo real
      inputNombreClase.addEventListener("input", () => {
          document.querySelector(".titulo h1").textContent = inputNombreClase.value.trim() || "Crear Clase";
      });
  } else {
      console.error("No se encontraron los elementos en el DOM.");
  }
});