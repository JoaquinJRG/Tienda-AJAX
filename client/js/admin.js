//Variables
const tituloAdmin = document.querySelector("#admin #titulo");
const inicioSection = document.getElementById("inicio");
const anadirProductosAdmin = document.getElementById("anadir-productos");
const anadirCategoriasAdmin = document.getElementById("anadir-categorias");
const eliminarProductosAdmin = document.getElementById("eliminar-productos");
const selectCategoria = document.getElementById("select-categoria");

//
function mostrarInicio() {
    tituloAdmin.innerHTML = "Administrar";
    inicioSection.style.display = "flex";
    anadirProductosAdmin.style.display = "none";
    anadirCategoriasAdmin.style.display = "none";
    eliminarProductosAdmin.style.display = "none";
}

//
function mostrarAnadirProductos() {
    tituloAdmin.innerHTML = "Añadir Productos";
    inicioSection.style.display = "none";
    anadirProductosAdmin.style.display = "flex";
    cargarCategoriasOption();
}

//
function mostrarAnadirCategorias() {
    tituloAdmin.innerHTML = "Añadir Categorías";
    inicioSection.style.display = "none";
    anadirCategoriasAdmin.style.display = "flex";

}

//
function mostrarEliminarProductos() {
    tituloAdmin.innerHTML = "Eliminar Productos";
    inicioSection.style.display = "none";
    eliminarProductosAdmin.style.display = "flex";
}


function anadirProducto(e) {

    e.preventDefault();
    
    let xhttp = new XMLHttpRequest(); 
    let nombreProd = document.getElementById("nombreProd").value;
    let precioProd = document.getElementById("precioProd").value;
    let stockProd = document.getElementById("stockProd").value;
    let descripcionProd = document.getElementById("descripcionProd").value;
    let imagenProd = document.getElementById("imagenProd").files[0]; 

    let formData = new FormData();
    formData.append("img", imagenProd);
    formData.append("nombre", nombreProd);
    formData.append("precio", precioProd);
    formData.append("stock", stockProd);
    formData.append("descripcion", descripcionProd);
    formData.append("idCategoria", selectCategoria.value);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "true") {
                alert("Producto añadido correctamente");
            } else {
                alert("Error al añadir el producto"); 
            }
        }
    };

    xhttp.open("POST", "server/anadir_producto.php", true);
    xhttp.send(formData);
}

function anadirCategoria() {

}

function eliminarProducto() {

}


//Crea los <option> con las categorías
function cargarCategoriasOption() {

    selectCategoria.innerHTML = "";
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let categorias = JSON.parse(this.responseText);
            categorias.forEach(cat => {
                let option = document.createElement("option");
                option.value = cat.idCategoria;
                option.innerHTML = cat.nombre;

                selectCategoria.appendChild(option);
            });
        }
    };

    xhttp.open("GET", "server/categorias_json.php", true);
    xhttp.send();
}
