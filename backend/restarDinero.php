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

// Obtener los datos del cuerpo de la solicitud HTTP
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$amountToSubtract = $data['amount'];

// Consulta SQL para obtener el dinero del usuario
$sqlSelectMoney = "SELECT money FROM users WHERE username = '$username'";
$resultSelectMoney = $conn->query($sqlSelectMoney);

if ($resultSelectMoney->num_rows > 0) {
    // Si se encontraron resultados, obtener la cantidad de dinero
    $row = $resultSelectMoney->fetch_assoc();
    $currentMoney = $row["money"];

    // Restar la cantidad especificada
    $newMoney = $currentMoney - $amountToSubtract;

    // Verificar que la nueva cantidad de dinero no sea negativa
    if ($newMoney >= 0) {
        // Actualizar el dinero en la base de datos
        $sqlUpdateMoney = "UPDATE users SET money = $newMoney WHERE username = '$username'";
        if ($conn->query($sqlUpdateMoney) === TRUE) {
            echo "Resta exitosa";
        } else {
            echo "Error al actualizar el dinero: " . $conn->error;
        }
    } else {
        echo "No hay suficiente dinero para restar";
    }
} else {
    echo "No se encontró el usuario";
}

$conn->close();
?>
