<?php

function leerConfiguración($nombre, $esquema) {
    $config = new DOMDocument();
    $config->load($nombre);
    $res = $config->schemaValidate($esquema);

    if ($res === FALSE) {
        throw new InvalidArgumentException("Revise fichero de configuración");
    }

    $datos = simplexml_load_file($nombre);
    $ip = $datos->xpath("//ip");
    $nombre = $datos->xpath("//nombre");
    $usu = $datos->xpath("//usuario");
    $clave = $datos->xpath("//clave");

    $cad = sprintf("mysql:dbname=%s;host=%s", $nombre[0], $ip[0]);

    $resul = [];
    $resul[] = $cad;
    $resul[] = $usu[0];
    $resul[] = $clave[0];

    return $resul;
}


function conectarBD() {
    $conexion = leerConfiguración(dirname(__FILE__) . "/config/configuracion.xml", dirname(__FILE__) . "/config/configuracion.xsd");

    try {
        $bd = new PDO($conexion[0], $conexion[1], $conexion[2]);
    } catch (PDOException $e) {
        echo "Error al conectar con la base de datos: " . $e->getMessage();
    }

    return $bd;
}
