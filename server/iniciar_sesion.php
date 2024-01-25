<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombreUsuario = $_POST["nombreUsuario"];
    $claveUsuario = crypt($_POST["claveUsuario"], "aa");

    //Todos los campos son obligatorios
    if ($nombreUsuario == "" || $claveUsuario == "") {
        echo "errorCampos";
        return;
    }

    require_once "conexion_bd.php";
    $bd = conectarBD();

    try {
        $sql = "SELECT idUsuario, nombre, correo, esAdmin FROM usuario 
                WHERE nombre='$nombreUsuario' AND clave = '$claveUsuario';";

        $resultado = $bd->query($sql);

        if (!$resultado || $resultado->rowCount() == 0) {
            echo "error";
        } else {

            session_start();
            $consulta = $resultado->fetch();

            $_SESSION["usuario"] = [
                "idUsuario" => $consulta["idUsuario"],
                "nombre" => $consulta["nombre"],
                "correo" => $consulta["correo"]
            ];

            $_SESSION["carrito"] = [];

            //Comprobamos si es admin 

            if ($consulta["esAdmin"] == 1) {
                echo "admin";
            } else {
                echo "true";
            }

        }
    } catch (PDOException $e) {
        echo "error";
    }
}
