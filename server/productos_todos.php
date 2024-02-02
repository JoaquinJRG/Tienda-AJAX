<?php


require_once "sesiones.php";
require_once "conexion_bd.php";

if (!comprobarSesion()) return;

$bd = conectarBD();

$sql = "SELECT idProducto, nombre, precio, imagen, stock FROM producto";

$resultado = $bd->query($sql);

//Consulta vacia
if ($resultado->rowCount() == 0 || !$resultado) {
    echo "false";
}

echo json_encode(iterator_to_array($resultado));
