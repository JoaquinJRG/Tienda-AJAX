<?php

require_once "sesiones.php";
require_once "conexion_bd.php";

if (!comprobarSesion()) return;

$bd = conectarBD();
$sql = "SELECT idCategoria, nombre, imagen FROM categoria;";
$resultado = $bd->query($sql);

if ($resultado->rowCount() == 0) {
    echo "false";
    return;
}

echo json_encode(iterator_to_array($resultado));
