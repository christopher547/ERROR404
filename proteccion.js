(function () {
    const scriptActual = document.currentScript;
    const semestreRequerido = Number(scriptActual?.getAttribute("data-semestre-requerido"));

    const usuarioActivoControl = sessionStorage.getItem("usuarioActivo");

    // 1. Si no hay sesión iniciada, regresar al login
    if (!usuarioActivoControl) {
        window.location.replace("login.html");
        return;
    }

    // 2. Buscar los datos completos del usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioActual = usuarios.find(u => u.control === usuarioActivoControl);

    if (!usuarioActual || !usuarioActual.semestre) {
        sessionStorage.clear();
        window.location.replace("login.html");
        return;
    }

    const semestreUsuario = Number(usuarioActual.semestre);

    // 3. Si el semestre del usuario NO coincide con el de la página actual
    if (semestreRequerido && semestreUsuario !== semestreRequerido) {
        const rutasSemestres = {
            1: "inicio.html",
            2: "inicio2.html",
            3: "inicio3.html",
            4: "inicio4.html",
            5: "inicio5.html",
            6: "inicio6.html"
        };

        const paginaCorrecta = rutasSemestres[semestreUsuario] || "login.html";
        alert(`Acceso denegado: este apartado es de ${semestreRequerido}° semestre y tu cuenta es de ${semestreUsuario}° semestre.`);
        window.location.replace(paginaCorrecta);
        return;
    }

    // 4. Opcional: mostrar datos del alumno en elementos con estos IDs si existen en el HTML
    const elNombre = document.getElementById("nombreAlumno");
    const elSemestre = document.getElementById("semestreAlumno");
    if (elNombre) elNombre.textContent = `${usuarioActual.nombre} ${usuarioActual.apellidoP}`;
    if (elSemestre) elSemestre.textContent = `${semestreUsuario}° Semestre`;

    // 5. Función global para cerrar sesión limpia
    window.cerrarSesion = function () {
        sessionStorage.removeItem("usuarioActivo");
        sessionStorage.removeItem("semestreActivo");
        window.location.replace("login.html");
    };
})();