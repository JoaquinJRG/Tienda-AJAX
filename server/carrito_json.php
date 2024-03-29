<?php

require_once "conexion_bd.php";
require "sesiones.php";

if (!comprobarSesion()) return;


$idProductos = implode(",", array_keys( $_SESSION["carrito"] ) );

if ($idProductos == null) {
    echo "error";
    return; 
}; 

$bd = conectarBD(); 
$sql = "SELECT idProducto, nombre, precio, imagen FROM producto 
        WHERE idProducto IN($idProductos)";
    
$resultado = $bd->query($sql); 

if(!$resultado || $resultado->rowCount() == 0){
    echo "error"; 
}

$precioTotal = 0; 
$arrayDatos = [];

foreach ($resultado as $value) {
    $arrayDatos[] = [
        "idProducto" => $value["idProducto"],
        "nombre" => $value["nombre"],
        "precio" => $value["precio"],
        "imagen" => $value["imagen"],
        "unidades" => $_SESSION["carrito"][$value["idProducto"]]
    ];
    $precioTotal += floatval( $value["precio"] ) * $_SESSION["carrito"][$value["idProducto"]];
}

echo json_encode( [$arrayDatos,  $precioTotal] );
