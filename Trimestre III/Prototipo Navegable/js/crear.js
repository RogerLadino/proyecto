document.addEventListener("DOMContentLoaded", () => {
    // Inicializar el array de clases desde localStorage o crearlo vacío si no existe
    let clases = JSON.parse(localStorage.getItem("clases")) || [];
  
    // Selección de elementos del DOM
    const inputNombreClase = document.querySelector(".campo input");
    const tituloClase = document.querySelector(".titulo h1");
    const botonCrear = document.querySelector(".boton-guardar");
    const listaClases = document.querySelector(".lista-clases"); 
  
    // Verificar que los elementos existan
    if (!inputNombreClase || !tituloClase || !botonCrear) {
      console.error("No se encontraron los elementos en el DOM.");
      return;
    }
    // Mostrar las clases guardadas al cargar la página
    function mostrarClases() {
    if (!listaClases) return; // Si no hay una lista en el DOM, evitar errores
        clases.forEach((clase) => {
        const elementoClase = document.createElement("li");
        elementoClase.textContent = `ID: ${clase.idAula} - Nombre: ${clase.nombre}`;
        listaClases.appendChild(elementoClase);
      });
    }
    // Actualizar el título de la clase en tiempo real
    inputNombreClase.addEventListener("input", () => {
    tituloClase.textContent = inputNombreClase.value.trim() || "Crear Clase";
    });
    // Manejo del evento al hacer clic en "Crear"
    botonCrear.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar redirección inmediata
    const nombreClase = inputNombreClase.value.trim(); // Obtener el nombre ingresado
    if (!nombreClase) {
        alert("Por favor, ingresa un nombre válido para la clase.");
        return;
      }
    // Crear un nuevo objeto de clase
    const nuevaClase = {
    idAula: clases.length + 1, // Generar un ID único para la clase
    nombre: nombreClase
      };
    // Agregar la clase al array
    clases.push(nuevaClase);
    // Guardar el nombre de la clase en localStorage
    localStorage.setItem("nuevaClase", nombreClase);
    console.log("Clase creada:", nombreClase);
    // Guardar el array de clases en localStorage
    localStorage.setItem("clases", JSON.stringify(clases));
    // Mostrar las clases actualizadas
    mostrarClases();
    alert(`Clase "${nombreClase}" creada correctamente.`);
    });
    // Mostrar las clases existentes al cargar la página
    mostrarClases();
  });