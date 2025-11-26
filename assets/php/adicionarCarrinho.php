<?php
session_start();

$id = $_POST['id_produto'] ?? null;
$qtd = $_POST['quantidade'] ?? 1;

if (!$id) {
    echo json_encode(["erro" => "ID do produto não enviado"]);
    exit;
}

if (!isset($_SESSION['carrinho'])) {
    $_SESSION['carrinho'] = [];
}

if (!isset($_SESSION['carrinho'][$id])) {
    $_SESSION['carrinho'][$id] = $qtd;
} else {
    $_SESSION['carrinho'][$id] += $qtd; 
}

echo json_encode(["sucesso" => true, "carrinho" => $_SESSION['carrinho']]);