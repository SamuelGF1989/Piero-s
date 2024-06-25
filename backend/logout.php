<?php
// Turn off error reporting
error_reporting(0);

// Configurar CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Iniciar sesión
session_start();

// Get the posted data
$data = $_POST;

// Check if the keys exist
if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];
    // Validate the username and password
    // ...
    // Destruir la sesión
    session_unset();
    session_destroy();

    // Respuesta JSON
    $response = array('success' => true, 'message' => 'Logout successful');
} else {
    $response = array('success' => false, 'message' => 'Invalid request');
}

echo json_encode($response);
?>