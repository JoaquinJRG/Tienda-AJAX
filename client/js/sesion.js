//Variables globales
const loginDiv = document.getElementById("login");
const loginForm = document.querySelector("#login form");
const crearCuentaDiv = document.getElementById("crear-cuenta");
const crearCuentaForm = document.querySelector("#crear-cuenta form");
const principalDiv = document.getElementById("principal");
const adminDiv = document.getElementById("admin");

let usuarioDato = document.getElementById("usuario-dato");

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

//Añade datos a BD y muestra mensaje
function crearCuenta(event) {
    //Evita que se recargue la página 
    event.preventDefault();

    let nombreUsuario = document.getElementById("crearUsuario");
    let correoUsuario = document.getElementById("crearCorreo");
    let claveUsuario = document.getElementById("crearClave");
    let mensaje = document.querySelector("#crear-cuenta .mensaje");

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "errorCampos") {
                mensaje.innerHTML = "Error: Rellena los campos vacios";
            } else if (this.responseText == "error") {
                mensaje.innerHTML = "Error al crear la cuenta";
            } else {
                mensaje.innerHTML = "Cuenta creada correctamente";
                nombreUsuario.value = "";
                correoUsuario.value = "";
                claveUsuario.value = "";
            }

        }
    };

    xhttp.open("POST", "server/crear_cuenta.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nombreUsuario=${nombreUsuario.value}&correoUsuario=${correoUsuario.value}&claveUsuario=${claveUsuario.value}`);
    return false;
}

//Inicia sesión o muestra mensaje en caso de error
//Al iniciar sesión oculta el login y muestra la sección principal
function iniciarSesion(event) {
    //Evita que se recargue la página 
    event.preventDefault();

    let nombreUsuario = document.getElementById("loginUsuario");
    let claveUsuario = document.getElementById("loginClave");
    let mensaje = document.querySelector("#login .mensaje");

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "error") {
                mensaje.innerHTML = "Revise usuario y contraseña";
            }

            if (this.responseText == "true") {
                loginDiv.style.display = "none"; 
                principalDiv.style.display = "flex";
                usuarioDato.innerHTML = "<b>Usuario:</b> " + nombreUsuario.value;
                cargarCategorias();
            }

            if (this.responseText == "admin") {
                mostrarAdmin(); 
            }

        }
    };

    xhttp.open("POST", "server/iniciar_sesion.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nombreUsuario=${nombreUsuario.value}&claveUsuario=${claveUsuario.value}`);

    return false;
}

// Oculta el formulario de login y muestra la sección de admin
function mostrarAdmin() {
    loginDiv.style.display = "none"; 
    adminDiv.style.display = "flex";    
}

//Cierra sesión. Oculta la sección principal y muestra el login
function cerrarSesion() {
    let xhttp = new XMLHttpRequest(); 

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loginDiv.style.display = "flex"; 
            principalDiv.style.display = "none";
            adminDiv.style.display = "none";     
             
            alert("Sesion cerrada con éxito");	
        }
    };  

    xhttp.open("GET", "server/cerrar_sesion.php", true);
    xhttp.send(); 

    return false; 
}



