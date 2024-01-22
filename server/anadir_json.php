<?php

require 'sesiones.php';
if (!comprobarSesion()) return;

$idProducto = $_POST['idProducto'];
$unidades = (int)$_POST['unidades'];


if (isset($_SESSION['carrito'][$idProducto])) {
	$_SESSION['carrito'][$idProducto] += $unidades;
} else {
	$_SESSION['carrito'][$idProducto] = $unidades;
}
