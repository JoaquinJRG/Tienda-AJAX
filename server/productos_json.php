<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $idCategoria = $_POST["idCategoria"];

    require_once "sesiones.php";
    require_once "conexion_bd.php";

    if (!comprobarSesion()) return;

    $bd = conectarBD();

    $sql = "SELECT idProducto, nombre, precio, imagen, stock FROM producto 
    WHERE idCategoria = $idCategoria AND stock > 0;"; 

    $resultado = $bd->query($sql);

    //Consulta vacia
    if($resultado->rowCount() == 0 || !$resultado){
        echo "false"; 
    }

    echo json_encode(iterator_to_array($resultado)); 

}