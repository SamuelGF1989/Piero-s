<?php
// Configurar CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Conexión a la base de datos (reemplaza los valores con los de tu configuración)
$servername = "localhost";
$username = "root";
$password = "Otonokizaka9";
$dbname = "elcarritodetono";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el nombre de usuario del cuerpo de la solicitud HTTP
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];

// Consulta SQL para obtener el dinero del usuario
$sql = "SELECT money FROM users WHERE username = '$username'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Si se encontraron resultados, obtener la cantidad de dinero
    $row = $result->fetch_assoc();
    $money = $row["money"];
    echo $money; // Devolver la cantidad de dinero como respuesta
} else {
    echo "0"; // Devolver 0 si no se encontró ningún usuario con el nombre de usuario proporcionado
}

$conn->close();
?>
