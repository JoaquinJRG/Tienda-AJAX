<?php

function comprobarSesion() {
    session_start();
    return isset($_SESSION["usuario"]);
}


