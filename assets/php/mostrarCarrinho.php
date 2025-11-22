<?php
session_start();
include("config.php");

$carrinho = $_SESSION['carrinho'] ?? [];
$itens = [];

foreach ($carrinho as $id => $qtd) {

    $stmt = $conn->prepare("SELECT nome, preco_unitario, url_img,estoque FROM produtos WHERE id_produto = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    if ($result) {
        $result['quantidade'] = $qtd;
        $result['subtotal'] = $result['preco_unitario'] * $qtd;
        $result['id_produto'] = $id;
        $itens[] = $result;
    }
}

echo json_encode($itens);
