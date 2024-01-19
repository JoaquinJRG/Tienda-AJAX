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