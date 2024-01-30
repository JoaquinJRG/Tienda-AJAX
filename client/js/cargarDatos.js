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
function cargarProductos(idCategoria, nombreCategoria, order = "DESC") {

    seccion.innerHTML = "";
    seccion.id = "productos";
    titulo.innerHTML = nombreCategoria;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "false[]") {
                seccion.innerHTML = "No hay productos de esta categoría."; 
                return; 
            }

            crearSeccionOrdenar(idCategoria, nombreCategoria);

            let productos = JSON.parse(this.responseText);
            productos.forEach(prod => {
                let div = document.createElement("div");
                let divDatos = document.createElement("div");
                let form = document.createElement("div");
                let addBtn = document.createElement("button");
                let input = document.createElement("input");
                let imagen = document.createElement("img"); 

                div.classList.add("producto");
                divDatos.classList.add("datos");
                form.classList.add("btns")
                imagen.src = "client/" + prod.imagen;

                divDatos.innerHTML = `
                    <h3>${prod.nombre}</h3>
                    <h4>${prod.precio} €</h4>
                    <p>Stock: ${prod.stock}</p>
                `;
 
                addBtn.innerHTML = "Añadir al carrito";
                addBtn.onclick = function() {
                    anadirProductos(prod.idProducto, Number( input.value ) ); 
                };

                input.type = "number";
                input.id = prod.idProducto; 
                //Rango de valores input
                input.min = "1"; 
                input.value = "1";
                input.max = prod.stock; 
                input.classList.add("cantidad");

                form.appendChild(input);
                form.appendChild(addBtn);
                div.appendChild(imagen);
                div.appendChild(divDatos)
                div.appendChild(form);

                seccion.appendChild(div);

                
            });
        }
    };

    xhttp.open("POST", "server/productos_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`idCategoria=${idCategoria}&order=${order}`);

    return false;

}

function crearSeccionOrdenar(idCategoria, nombreCategoria) {
    
    seccion.innerHTML = `
    <div>
        <select>
            <option value="DESC">Más caro a más barato</option>
            <option value="ASC">Más barato a más caro</option>
        </select>
        <button id="ordenar">Ordenar</button>
    </div>
    `;

    document.querySelector("#ordenar").addEventListener("click", () => {
        let selectValue = document.querySelector("select").value;
        cargarProductos(idCategoria, nombreCategoria, selectValue);
    })

}
