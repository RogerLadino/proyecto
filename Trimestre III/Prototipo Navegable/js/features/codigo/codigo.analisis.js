import { pedirAnalisisDeCodigo } from '../../api/gemini.api.js'

let waiting = false

const agregarMensaje = (tipoUsuario, mensaje) => {
    document.querySelector(".messages").innerHTML += `<p class="message ${tipoUsuario}">${mensaje}</p>`
}

document.querySelector('.chat').addEventListener("submit", async (e) => {
    e.preventDefault()

    if (waiting) return

    const input = document.querySelector(".chat-input")
    const mensaje = input.value.trim()

    if (mensaje.length > 0) {
        input.value = ""

        agregarMensaje('user', mensaje)

        const codigo = document.getElementById("code").value

        const descripcion = document.querySelector('.descripcion-ejercicio').innerHTML

        waiting = true

        const response = await pedirAnalisisDeCodigo(codigo, descripcion, mensaje)

        waiting = false

        agregarMensaje('agent', response)
    }
})