<?php

require 'sesiones.php';
require_once "conexion_bd.php";

if (!comprobarSesion()) return;

$nombre = $_POST["nombre"]; 
$precio = $_POST["precio"]; 
$imagen = "/img//" . $_FILES["img"]["name"]; 
$stock = $_POST["stock"];
$descripcion = $_POST["descripcion"]; 
$idCategoria = $_POST["idCategoria"]; 

//Guardar imagen carpeta
move_uploaded_file($_FILES["img"]["tmp_name"], "../client/img/" . $_FILES["img"]["name"]);

$bd = conectarBD();

//Comprobamos si existe un producto con ese mismo nombre 
$sqlSelect = "SELECT nombre FROM producto WHERE nombre = '$nombre';";
$select = $bd->query($sqlSelect);


if ($select->rowCount() == 0) {
    $sqlInsert = "INSERT INTO producto(nombre, precio, descripcion, imagen, stock, idCategoria, idAdmin) 
                  VALUES('$nombre', '$precio', '$descripcion', '$imagen', '$stock', '$idCategoria', '1');"; 

    $resultado = $bd->query($sqlInsert);

    //Error al hacer el insert 
    if(!$resultado){
        echo "error"; 
        return; 
    }

    echo "true";

} else {
    echo "error";
    return; 
}



