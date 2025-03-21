// Obtener los usuarios desde localStorage, si existen
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
    { usuario: "juan", contraseña: "12345", pago: true },
    { usuario: "maria", contraseña: "67890", pago: false }
];

// Función para registrar el usuario
function registrarUsuario() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    // Validar que los campos no estén vacíos
    if (!usuario || !contraseña) {
        alert("Por favor ingresa un nombre de usuario y una contraseña.");
        return;
    }

    // Verificar si el usuario ya está registrado
    const usuarioExistente = usuarios.find(u => u.usuario === usuario);
    if (usuarioExistente) {
        alert("El usuario ya está registrado.");
        return;
    }

    // Registrar nuevo usuario (sin pago confirmado)
    usuarios.push({ usuario, contraseña, pago: false });

    // Guardar los usuarios en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Usuario registrado exitosamente.");
}

// Función para verificar el pago
function verificarPago() {
    const usuarioVerificar = document.getElementById("usuario-verificar").value;

    // Validar que el campo no esté vacío
    if (!usuarioVerificar) {
        alert("Por favor ingresa el nombre de usuario para verificar.");
        return;
    }

    // Buscar el usuario en la base de datos
    const usuario = usuarios.find(u => u.usuario === usuarioVerificar);

    // Limpiar cualquier estilo previo
    const resultado = document.getElementById("resultado");
    resultado.classList.remove("confirmado", "no-confirmado");

    if (!usuario) {
        // Si no se encuentra el usuario en la base de datos
        resultado.innerText = "❌ Usuario no encontrado.";
        resultado.classList.add("no-confirmado");  // Mensaje en rojo
        return;
    }

    // Verificar el estado de pago del usuario
    if (usuario.pago) {
        resultado.innerText = "✔️ Pago confirmado.";
        resultado.classList.add("confirmado");  // Mensaje en verde
    } else {
        resultado.innerText = "❌ Pago no realizado.";
        resultado.classList.add("no-confirmado");  // Mensaje en rojo
    }
}
