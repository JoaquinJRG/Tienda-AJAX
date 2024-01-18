<?php

session_start();
$_SESSION = []; 
session_destroy(); 
setcookie(session_name(), 123, time() - 1000);