const aside = document.querySelector("aside");
const productosSection = document.querySelector("#productosCarrito");

//Abre la sección del carrito y carga los productos
function abrirCarrito() {
    aside.style.width = "450px";
    cargarCarrito();
}

//Cierra el carrito
function cerrarCarrito() {
    aside.style.width = "0";
}

//Añade los productos indicados al carrito
function anadirProductos(idProducto, unidades) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Producto añadido con éxito");
        }
    };

    xhttp.open("POST", "server/anadir_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`idProducto=${idProducto}&unidades=${unidades}`);

    return false;
}

//Elimina los productos indicados del carrito
function eliminarProductos(idProducto, unidades) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Producto eliminado con éxito");
            cargarCarrito();
        }
    };

    xhttp.open("POST", "server/eliminar_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`idProducto=${idProducto}&unidades=${unidades}`);

    return false;
}

//Muestra los productos
function cargarCarrito() {

    productosSection.innerHTML = ""; 

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let productos = JSON.parse(this.responseText);

            productos.forEach(prod => {
                console.log(prod);
            });
        }
    };

    xhttp.open("GET", "server/carrito_json.php", true);
    xhttp.send();
    return false;

}
