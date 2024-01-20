//Variables globales
const seccion = document.querySelector("section");
const titulo = document.getElementById("titulo");

//Funciones
//Obtiene los datos de las categorías y representa los datos
function cargarCategorias() {

    seccion.innerHTML = "";
    seccion.id = "categorias"
    titulo.innerHTML = "Categorías";
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let categorias = JSON.parse(this.responseText);
            categorias.forEach(cat => {
                let div = document.createElement("div");
                let p = document.createElement("p");
                let img = document.createElement("img");

                img.src = `client/${cat.imagen}`;
                div.classList.add("categoria");

                div.onclick = function () {
                    cargarProductos(cat.idCategoria, cat.nombre);
                }

                p.innerHTML = cat.nombre;

                div.appendChild(img);
                div.appendChild(p);
                seccion.appendChild(div);
            });
        }
    };

    xhttp.open("GET", "server/categorias_json.php", true);
    xhttp.send();

    return false;
}

//Obtiene los datos de los productos de una categoría determinada y los representa.
function cargarProductos(idCategoria, nombreCategoria) {

    seccion.innerHTML = "";
    seccion.id = "productos";
    titulo.innerHTML = nombreCategoria;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let productos = JSON.parse(this.responseText);
            productos.forEach(prod => {
                let div = document.createElement("div");
                let divDatos = document.createElement("div");
                let divBtn = document.createElement("div");
                let addBtn = document.createElement("button");
                let input = document.createElement("input");
                let imagen = document.createElement("img"); 

                div.classList.add("producto");
                divDatos.classList.add("datos");
                divBtn.classList.add("btns")
                imagen.src = "client/" + prod.imagen;

                divDatos.innerHTML = `
                    <h3>${prod.nombre}</h3>
                    <h4>${prod.precio} €</h4>
                    <p>Stock: ${prod.stock}</p>
                `;

                addBtn.innerHTML = "Añadir al carrito";
                input.type = "number";
                input.classList.add("cantidad");

                divBtn.appendChild(addBtn);
                divBtn.appendChild(input);
                div.appendChild(imagen);
                div.appendChild(divDatos)
                div.appendChild(divBtn);

                seccion.appendChild(div);
                addBtn.onclick = function() {addCarrito(prod.idProducto)}
            });
        }
    };

    xhttp.open("POST", "server/productos_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`idCategoria=${idCategoria}`);

    return false;

}


function addCarrito(idProducto) {
    console.log(idProducto);
}