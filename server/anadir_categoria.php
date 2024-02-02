<?php

require 'sesiones.php';
require_once "conexion_bd.php";

if (!comprobarSesion()) return;

$nombre = $_POST["nombre"]; 
$imagen = "/img//" . $_FILES["img"]["name"]; 

//Guardar imagen carpeta
move_uploaded_file($_FILES["img"]["tmp_name"], "../client/img/" . $_FILES["img"]["name"]);

$bd = conectarBD();

$sqlInsert = "INSERT INTO categoria(nombre, imagen, idAdmin)
VALUES('$nombre', '$imagen', '1');";

$resultado = $bd->query($sqlInsert);

//Error al hacer el insert 
if(!$resultado){
    echo "false"; 
    return; 
}

echo "true"; 


