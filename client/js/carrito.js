const aside = document.querySelector("aside");
const productosSection = document.getElementById("productosCarrito");
const realizarPedido = document.getElementById("realizar-pedido");

//Abre la sección del carrito y carga los productos
function abrirCarrito() {
    aside.style.width = "500px";    
    cargarCarrito();
}

//Cierra el carrito
function cerrarCarrito() {
    productosSection.innerHTML = ""; 
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
            
            if (this.responseText == "error") {
                productosSection.innerHTML = "Carrito vacío."; 
                return; 
            }
            
            realizarPedido.style.display = "block";

            let productos = JSON.parse(this.responseText);
            productos.forEach(prod => {
                let div = document.createElement("div");
                let img = document.createElement("img"); 
                let datosCarrito = document.createElement("div")

                div.classList.add("productoCarrito");
                img.src = "client/" + prod.imagen;
                datosCarrito.innerHTML = `
                    <h5>${prod.nombre}</h5>
                    <h6>${prod.precio} €</h6>
                    <h6>Unidades: ${prod.unidades}</h6>
                `;

                div.appendChild(img);
                div.appendChild(datosCarrito);

                productosSection.appendChild(div);
            });
        }
    };

    xhttp.open("GET", "server/carrito_json.php", true);
    xhttp.send();
    return false;

}
