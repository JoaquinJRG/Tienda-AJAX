<?php

require_once 'sesiones.php';
require 'conexion_bd.php';

if (!comprobarSesion()) return;

$resul = realizarPedido($_SESSION['carrito'], $_SESSION['usuario']['idUsuario']);

if ($resul == false) {
    echo "error";
} else {

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

    $productos = iterator_to_array($resultado);
    foreach ($productos as &$producto) {
        $cod = $producto['idProducto'];
        $producto['unidades'] = $_SESSION['carrito'][$cod];	
    }

    echo json_encode($productos);
    //Vaciar el carrito
    $_SESSION['carrito'] = [];
}

function realizarPedido($carrito, $idUsuario) {
    $bd = conectarBD();
    $bd->beginTransaction(); //Por si falla 

    //Insert en tabla pedido
    $sql = "INSERT INTO pedido(idCliente) VALUES ($idUsuario);";
    $resultado = $bd->query($sql);

    if (!$resultado) {
        return false;
    }

    //Guardamos en una variable el id del pedido. 
    $idPedido = $bd->lastInsertId();

    foreach ($carrito as $idProducto => $unidades) {
        //Insert en tabla pedidosProducto
        $insert = "INSERT INTO pedidosProducto(idPedido, idProducto, unidades) 
                   VALUES($idPedido, $idProducto, $unidades);";

        $resulInsert = $bd->query($insert);

        //Modificar el stock
        $update = "UPDATE producto SET stock = stock - $unidades 
                   WHERE idProducto = $idProducto;";

        $resulUpdate = $bd->query($update);

        //Si falla el insert o el update se deshace
        if (!$resulInsert || !$resulUpdate) {
            $bd->rollBack();
            return false;
        }
    }

    $bd->commit();
    return $idPedido;
}
