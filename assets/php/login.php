<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
include("config.php");
$dados = json_decode(file_get_contents("php://input"), true) ?? [];
$email = $dados["email"] ?? ''; 
$senha = $dados["senha"] ?? '';

if (!$email || !$senha) {
    echo json_encode(["sucesso" => false, "mensagem" => "Campos obrigatórios."]);
    exit;
}


$sql = "SELECT id_cliente, nome, email, senha FROM clientes WHERE email = ? LIMIT 1";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro na preparação da consulta."]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if ($senha === $user["senha"]) {

        session_regenerate_id(true);
        $_SESSION["id_cliente"] = $user["id_cliente"];
        $_SESSION["nome"] = $user["nome"];
        $_SESSION["email"] = $user["email"];
        $_SESSION["logado"] = true;

        echo json_encode([
            "sucesso" => true,
            "mensagem" => "",
            "usuario" => [
                "id_cliente" => $user["id_cliente"],
                "nome" => $user["nome"],
                "email" => $user["email"]
            ]
        ]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Usuario ou Senha incorretos."]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Usuario ou Senha incorretos."]);
}

$stmt->close();
$conn->close();
?>