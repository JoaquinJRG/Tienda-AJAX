let tituloAdmin = document.querySelector("#admin #titulo");
const inicioSection = document.getElementById("inicio");
const adminSection = document.getElementById("administar")

function mostrarInicio() {
    tituloAdmin.innerHTML = "Administrar";
    inicioSection.style.display = "flex";
    adminSection.style.display = "none";  
}

function mostrarAnadirProductos() {
    tituloAdmin.innerHTML = "Añadir Productos";
    inicioSection.style.display = "none";
    adminSection.style.display = "flex";  
}

function mostrarAnadirCategorias() {
    tituloAdmin.innerHTML = "Añadir Categorías";
    inicioSection.style.display = "none";
    adminSection.style.display = "flex";  

}

function mostrarEliminarProductos() {
    tituloAdmin.innerHTML = "Eliminar Productos";
    inicioSection.style.display = "none";
    adminSection.style.display = "flex";  

}