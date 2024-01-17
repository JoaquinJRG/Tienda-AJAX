//Variables globales
const loginDiv = document.getElementById("login");
const crearCuentaDiv = document.getElementById("crear-cuenta");
const principalDiv = document.getElementById("principal");

//Funciones

// Oculta el login y muestra el formulario para crear cuenta
function mostrarCrearCuenta() {
    loginDiv.style.display = "none";
    crearCuentaDiv.style.display = "flex";
}

// Oculta el formulario para crear cuenta y muestra el login
function mostrarLogin() {
    crearCuentaDiv.style.display = "none";
    loginDiv.style.display = "flex";
}


