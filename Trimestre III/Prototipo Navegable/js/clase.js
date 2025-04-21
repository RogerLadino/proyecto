document.addEventListener("DOMContentLoaded", function () {
    const clases = document.querySelectorAll(".clase");

    // Recuperar el nombre actualizado desde localStorage
    const nombreGuardado = localStorage.getItem("nuevaClase");

    if (nombreGuardado && clases.length > 0) {
        // Modificar el nombre de la primera clase (ajústalo según tu estructura)
        const primeraClase = clases[0].querySelector(".clase-titulo p");
        
        if (primeraClase) {
            primeraClase.textContent = nombreGuardado;
        }
    }
});