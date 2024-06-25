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

    // Set the cookie
    $cookie_name = "authenticated";
    $cookie_value = "true";
    $cookie_expire_time = time() + (60 * 60 * 24 * 30); // Expires in 30 days
    setcookie($cookie_name, $cookie_value, $cookie_expire_time, "/");

    // Respuesta JSON
    $response = array('success' => true, 'message' => 'Login successful');
} else {
    $response = array('success' => false, 'message' => 'Invalid request');
}

echo json_encode($response);
?>