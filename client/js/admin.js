const tituloAdmin = document.querySelector("#admin #titulo");
const inicioSection = document.getElementById("inicio");
const anadirProductosAdmin = document.getElementById("anadir-productos");
const anadirCategoriasAdmin = document.getElementById("anadir-categorias");
const eliminarProductosAdmin = document.getElementById("eliminar-productos");



function mostrarInicio() {
    tituloAdmin.innerHTML = "Administrar";
    inicioSection.style.display = "flex";
    anadirProductosAdmin.style.display = "none";  
    anadirCategoriasAdmin.style.display = "none";  
    eliminarProductosAdmin.style.display = "none";  
}

function mostrarAnadirProductos() {
    tituloAdmin.innerHTML = "Añadir Productos";
    inicioSection.style.display = "none";
    anadirProductosAdmin.style.display = "flex";  
}

function mostrarAnadirCategorias() {
    tituloAdmin.innerHTML = "Añadir Categorías";
    inicioSection.style.display = "none";
    anadirCategoriasAdmin.style.display = "flex";  

}

function mostrarEliminarProductos() {
    tituloAdmin.innerHTML = "Eliminar Productos";
    inicioSection.style.display = "none";
    eliminarProductosAdmin.style.display = "flex";  
}

