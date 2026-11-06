<?php
// agregado
$servidor = "localhost";
$usuario = "root";
$password = "";
$basedatos = "registrados";

$conexion = new mysqli($servidor, $usuario, $password, $basedatos);

if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8mb4");
?>