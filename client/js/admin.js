let tituloAdmin = document.querySelector("#admin #titulo");
const inicioSection = document.getElementById("inicio");
const anadirProductos = document.getElementById("anadir-productos");
const anadirCategorias = document.getElementById("anadir-categorias");
const eliminarProductos = document.getElementById("eliminar-productos");

function mostrarInicio() {
    tituloAdmin.innerHTML = "Administrar";
    inicioSection.style.display = "flex";
    anadirProductos.style.display = "none";  
    anadirCategorias.style.display = "none";  
    eliminarProductos.style.display = "none";  
}

function mostrarAnadirProductos() {
    tituloAdmin.innerHTML = "Añadir Productos";
    inicioSection.style.display = "none";
    anadirProductos.style.display = "flex";  
}

function mostrarAnadirCategorias() {
    tituloAdmin.innerHTML = "Añadir Categorías";
    inicioSection.style.display = "none";
    anadirCategorias.style.display = "flex";  

}

function mostrarEliminarProductos() {
    tituloAdmin.innerHTML = "Eliminar Productos";
    inicioSection.style.display = "none";
    eliminarProductos.style.display = "flex";  

}