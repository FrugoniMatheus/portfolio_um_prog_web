<?php  
 include("config.php");
error_reporting(E_ALL);
ini_set('display_errors', 1);
$dados = json_decode(file_get_contents("php://input"), true) ?? [];

$cpf = $dados["cpf"] ?? ''; 
$email = $dados["email"] ?? '';

if (!$email || !$cpf) {
    echo json_encode(["sucesso" => false, "mensagem" => "Campos obrigatórios."]);
    exit;
}

$sql = "SELECT cpf,email FROM clientes WHERE cpf= ? or email = ? LIMIT 1";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro na preparação da consulta."]);
    exit;
}
$stmt->bind_param("ss", $cpf,$email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["sucesso" => false, "mensagem" => "Este usuário já está cadastrado."]);
} else {
    echo json_encode(["sucesso" => true, "mensagem" => "Usuário disponível para cadastro."]);
}
$stmt->close();
$conn->close();