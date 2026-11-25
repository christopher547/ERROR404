const formularioRegistro = document.getElementById("registroForm");

formularioRegistro.addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellidoP = document.getElementById("apellidoP").value.trim();
    const apellidoM = document.getElementById("apellidoM").value.trim();
    const control = document.getElementById("control").value.trim();
    const semestre = Number(document.getElementById("semestre").value);
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;

    // Validar semestre
    if (!semestre || semestre < 1 || semestre > 6) {
        alert("Selecciona un semestre válido (1 a 6).");
        return;
    }

    // Validar contraseñas
    if (password !== confirmar) {
        alert("Las contraseñas no coinciden.");
        return;
    }
    if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    // Obtener usuarios existentes
    const usuarios = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
    );

    // Verificar número de control duplicado
    const existe = usuarios.some(usuario =>
        usuario.control === control
    );
    if (existe) {
        alert("El número de control ya está registrado.");
        return;
    }

    // Crear nuevo usuario incluyendo el semestre
    const nuevoUsuario = {
        nombre: nombre,
        apellidoP: apellidoP,
        apellidoM: apellidoM,
        control: control,
        semestre: semestre,
        password: password
    };

    // Agregar usuario y guardar en localStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Usuario guardado correctamente!");
    window.location.href = "login.html";
});