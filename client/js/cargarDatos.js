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

                div.onclick = function() {
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
                let p = document.createElement("p");
                let img = document.createElement("img"); 

                img.src = `client/${prod.imagen}`;
                div.classList.add("producto");
                p.innerHTML = prod.nombre;

                div.appendChild(img);
                div.appendChild(p);
                seccion.appendChild(div);
            });
        }
    };

    xhttp.open("POST", "server/productos_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`idCategoria=${idCategoria}`);

    return false;

}