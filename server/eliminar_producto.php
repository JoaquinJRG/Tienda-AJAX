<?php


require 'sesiones.php';
require_once "conexion_bd.php";

if (!comprobarSesion()) return;


$idProducto = $_POST["idProducto"]; 

$bd = conectarBD(); 
$delete = "DELETE FROM producto WHERE idProducto = $idProducto;";

$resultado = $bd->query($delete);

if(!$resultado){
    echo "false"; 
}

echo "true"; 