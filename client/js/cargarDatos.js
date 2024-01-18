//Variables globales
const lista = document.getElementById("lista");


//Funciones
function cargarCategorias() {

    lista.innerHTML = ""; 
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let categorias = JSON.parse(this.responseText);
            categorias.forEach(cat => {
                let li = document.createElement("li");
                li.innerHTML = cat.nombre;
                lista.appendChild(li);
            });
        }
    };

    xhttp.open("GET", "server/categorias_json.php", true);
    xhttp.send();

    return false;
}