<?php
// Configurar CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (isset($_COOKIE['authenticated']) && $_COOKIE['authenticated'] === 'true') {
    // User is authenticated, display protected content
    $username = isset($_COOKIE['username']) ? $_COOKIE['username'] : 'Usuario';
    echo "Bienvenido, $username!";
} else {
    // User is not authenticated, redirect to login page
    header('Location: login.php');
    exit;
}
?>
