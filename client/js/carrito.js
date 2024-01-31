const aside = document.querySelector("aside");
const productosSection = document.getElementById("productosCarrito");
const pedirDiv = document.getElementById("pedir");
const realizarPedidoBtn = document.getElementById("realizar-pedido");
let precio = document.createElement("p"); 

let precioTotal; 

//Abre la sección del carrito y carga los productos
function abrirCarrito() {
    aside.style.display = "block";
    cargarCarrito();
}

//Cierra el carrito
function cerrarCarrito() {
    aside.style.display = "none";
    productosSection.innerHTML = "";
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
    precio.innerHTML = "";
    productosSection.innerHTML = "";

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "error") {
                productosSection.innerHTML = "Carrito vacío.";
                pedirDiv.style.display = "none";
                return;
            }

            pedirDiv.style.display = "flex";

            let productos = JSON.parse(this.responseText);
            productos[0].forEach(prod => {
                let div = document.createElement("div");
                let img = document.createElement("img");
                let datosCarrito = document.createElement("div")
                let btnEliminar = document.createElement("button");

                btnEliminar.innerHTML = "Eliminar";
                btnEliminar.onclick = function () {
                    eliminarProductos(prod.idProducto, 1);
                };
                div.classList.add("productoCarrito");
                img.src = "client/" + prod.imagen;
                datosCarrito.innerHTML = `
                    <h5>${prod.nombre}</h5>
                    <h6>${prod.precio} €</h6>
                    <h6>Unidades: ${prod.unidades}</h6>
                `;

                div.appendChild(img);
                div.appendChild(datosCarrito);
                div.appendChild(btnEliminar);

                productosSection.appendChild(div);
            });

            //Precio total de los productos
            precio.innerHTML = "Precio total: " + productos[1] + "€";
            pedirDiv.appendChild(precio);

            precioTotal = productos[1]; 
        }

    };

    xhttp.open("GET", "server/carrito_json.php", true);
    xhttp.send();
    return false;

}

//Se realiza el pedido con los productos del carrito y se muestran
function procesarPedido() {

    cerrarCarrito();
    titulo.innerHTML = "Pedido";
    seccion.innerHTML = "";

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "error") {
                seccion.innerHTML = "Error al realizar el pedido.";
                return;
            }

            let productosPedido = JSON.parse( this.responseText );

            productosPedido.forEach((producto) => {
                let div = document.createElement("div");
                let datos = document.createElement("div")

                div.id = "divProdPedido";
                datos.innerHTML = `
                    <h5>${producto.nombre}</h5>
                    <h6>${producto.precio} €</h6>
                    <h6>Unidades: ${producto.unidades}</h6>
                `;

                div.appendChild(datos);

                seccion.append(div);
            });

            let parrPrecio = document.createElement("p");
            parrPrecio.innerHTML = "Precio total: " + precioTotal + " €"; 
            seccion.appendChild(parrPrecio); 
        }

    };

    xhttp.open("GET", "server/procesar_pedido_json.php", true);
    xhttp.send();
    return false;

}