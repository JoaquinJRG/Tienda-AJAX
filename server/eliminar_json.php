<?php

require_once 'sesiones.php';
if (!comprobarSesion()) return;

$idUnidades = $_POST['idProducto'];
$unidades = (int)$_POST['unidades'];

if (isset($_SESSION['carrito'][$idUnidades])) {
	$_SESSION['carrito'][$idUnidades] -= $unidades;

	if ($_SESSION['carrito'][$idUnidades] <= 0) {
		unset($_SESSION['carrito'][$idUnidades]);
	}
}
