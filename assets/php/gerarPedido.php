<?php
session_start();
include "config.php";

if (!isset($_SESSION['id_cliente'])) {
    echo json_encode(["sucesso" => false, "msg" => "Usuário não está logado"]);
    exit;
}

$id_cliente = $_SESSION['id_cliente'];
$carrinho = $_SESSION['carrinho'] ?? [];

if (empty($carrinho)) {
    echo json_encode(["sucesso" => false, "msg" => "Carrinho vazio"]);
    exit;
}

$sql = "INSERT INTO pedidos (cliente_id, total, status) VALUES (?, 0, 'Pendente')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_cliente);
$stmt->execute();

$id_pedido = $stmt->insert_id;
$total = 0;

foreach ($carrinho as $produto_id => $qtd) {

    $sql = "SELECT preco_unitario FROM produtos WHERE id_produto = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $produto_id);
    $stmt->execute();
    $preco = $stmt->get_result()->fetch_assoc()['preco_unitario'];

    $sql = "INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco_unitario)
            VALUES (?, ?, ?, ?)";

    $stmt2 = $conn->prepare($sql);
    $stmt2->bind_param("iiid", $id_pedido, $produto_id, $qtd, $preco);
    $stmt2->execute();

    $total += $preco * $qtd;
}

$sql = "UPDATE pedidos SET total = ? WHERE id_pedido = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("di", $total, $id_pedido);
$stmt->execute();

unset($_SESSION['carrinho']);

echo json_encode(["sucesso" => true, "msg" => "Pedido finalizado", "pedido_id" => $id_pedido]);
?>