<?php

require_once "conexion_bd.php";
require "sesiones.php";

if (!comprobarSesion()) return;

echo json_encode($_SESSION["carrito"]);
