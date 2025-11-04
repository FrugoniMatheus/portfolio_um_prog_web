<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();

include("config.php");

// Lê o JSON enviado pelo fetch()
$dados = json_decode(file_get_contents("php://input"), true) ?? [];

// Captura os dados enviados
$email = $dados["email"] ?? ''; // o JS ainda envia "usuario"
$senha = $dados["senha"] ?? '';

// Verifica se os campos vieram preenchidos
if (!$email || !$senha) {
    echo json_encode(["sucesso" => false, "mensagem" => "Campos obrigatórios."]);
    exit;
}

// Aqui ajustamos o nome da tabela e os campos de acordo com o seu banco
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
            "mensagem" => "Login bem-sucedido!",
            "usuario" => [
                "id_cliente" => $user["id_cliente"],
                "nome" => $user["nome"],
                "email" => $user["email"]
            ]
        ]);

    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Senha incorreta."]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Usuário não encontrado."]);
}

$stmt->close();
$conn->close();
?>