<?php
// Configurar CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Verificar el método de la solicitud
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$db_host = 'localhost';
$db_username = 'root';
$db_password = 'Otonokizaka9';
$db_name = 'elcarritodetono';

$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}

// Leer el cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username']?? '';
$password = $data['password']?? '';

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'essage' => 'Faltan credenciales']);
    exit;
}

// Check if username already exists
$username_check_query = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($username_check_query);

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'essage' => 'El nombre de usuario ya existe']);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$query = "INSERT INTO users (username, password) VALUES ('$username', '$passwordHash')";

if ($conn->query($query) === TRUE) {
    $response = array('success' => true, 'essage' => 'Usuario registrado con éxito');
    echo json_encode($response);
} else {
    $response = array('success' => false, 'essage' => 'Error al registrar usuario: '. $conn->error);
    echo json_encode($response);
}

$conn->close();
?>