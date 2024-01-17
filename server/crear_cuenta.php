<?php

if($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombreUsuario = $_POST["nombreUsuario"];
    $correoUsuario = $_POST["correoUsuario"];
    $claveUsuario = crypt($_POST["claveUsuario"], "aa"); 

    //Todos los campos son obligatorios
    if($nombreUsuario == "" || $correoUsuario == "" || $claveUsuario == "") {
        echo "errorCampos"; 
        return; 
    }

    require_once "conexion_bd.php";

    $bd = conectarBD(); 

    try {
        $sql = "INSERT INTO usuario(nombre, correo, clave) 
        VALUES('$nombreUsuario', '$correoUsuario', '$claveUsuario');";

        $resultado = $bd->query($sql); 

        echo "true";  

    } catch (PDOException $e) {
        echo "error"; 
    }



}