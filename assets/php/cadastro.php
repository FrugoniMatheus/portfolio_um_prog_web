<?php
include("config.php");
error_reporting(E_ALL);
ini_set('display_errors', 1);
$dados = json_decode(file_get_contents("php://input"), true) ?? [];
$cpf = $dados['cpf'] ?? '';
$nome = $dados['nome'] ?? '';
$telefone = $dados['telefone'] ?? '';
$email = $dados['email'] ?? '';
$senha = $dados['senha'] ?? ''; 
$CEP = $dados['cep'] ?? '';
$endereco = $dados['endereco'] ?? '';
$conn->begin_transaction();
try {
    $sqlCliente = "INSERT INTO clientes (cpf, nome, email, senha, telefone)
                   VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sqlCliente);
    $stmt->bind_param("sssss", $cpf, $nome, $email, $senha, $telefone);
    $stmt->execute();
    $cliente_id = $conn->insert_id;
    $sqlEndereco = "INSERT INTO enderecos (cliente_id, CEP, endereco)
                    VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sqlEndereco);
    $stmt->bind_param("iss", $cliente_id, $CEP, $endereco);
    $stmt->execute();
    $conn->commit();
    echo json_encode(["sucesso" => true, "mensagem" => "Usuario cadastrado com sucesso!"]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao cadastrar: " . $e->getMessage()]);
}
$conn->close();
?>