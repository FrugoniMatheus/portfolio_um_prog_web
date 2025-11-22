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

// 1. Criar pedido com total temporário
$sql = "INSERT INTO pedidos (cliente_id, total, status) VALUES (?, 0, 'Pendente')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_cliente);
$stmt->execute();

$id_pedido = $stmt->insert_id;
$total = 0;

// 2. Inserir itens do pedido
foreach ($carrinho as $produto_id => $qtd) {

    // pegar preço atual
    $sql = "SELECT preco_unitario FROM produtos WHERE id_produto = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $produto_id);
    $stmt->execute();
    $preco = $stmt->get_result()->fetch_assoc()['preco_unitario'];

    // inserir item
    $sql = "INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco_unitario)
            VALUES (?, ?, ?, ?)";

    $stmt2 = $conn->prepare($sql);
    $stmt2->bind_param("iiid", $id_pedido, $produto_id, $qtd, $preco);
    $stmt2->execute();

    // acumular total
    $total += $preco * $qtd;
}


// 3. Atualizar total do pedido
$sql = "UPDATE pedidos SET total = ? WHERE id_pedido = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("di", $total, $id_pedido);
$stmt->execute();

// 4. Limpar carrinho
unset($_SESSION['carrinho']);

echo json_encode(["sucesso" => true, "msg" => "Pedido finalizado", "pedido_id" => $id_pedido]);
?>