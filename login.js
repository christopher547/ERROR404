const formulario = document.getElementById("loginForm");

// Cambia estos nombres de archivo por los de tus 6 códigos reales
const rutasSemestres = {
    1: "inicio1.html",
    2: "inicio2.html",
    3: "inicio3.html",
    4: "inicio4.html",
    5: "inicio5.html",
    6: "inicio6.html"
};

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const control = document.getElementById("control").value.trim();
    const password = document.getElementById("password").value;

    const usuarios = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
    );

    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.control === control &&
        usuario.password === password
    );

    if (usuarioEncontrado) {
        const destino = rutasSemestres[usuarioEncontrado.semestre];

        if (!destino) {
            alert("El usuario no tiene un semestre válido asignado.");
            return;
        }

        alert(`¡Bienvenido, ${usuarioEncontrado.nombre}! (${usuarioEncontrado.semestre}° semestre)`);
        sessionStorage.setItem("usuarioActivo", usuarioEncontrado.control);
        sessionStorage.setItem("semestreActivo", String(usuarioEncontrado.semestre));

        window.location.href = destino;
    } else {
        alert("Número de control o contraseña incorrectos.");
    }
});