<?php
session_start();
include "config.php";

if (!isset($_SESSION['id_cliente'])) {
    echo json_encode(["sucesso" => false, "msg" => "Usuário não está logado"]);
    exit;
}

$id_cliente = $_SESSION['id_cliente'];

$sql = "SELECT id_pedido, data_pedido,total FROM pedidos WHERE cliente_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_cliente);
$stmt->execute();
$resultPedidos = $stmt->get_result();

$pedidos = [];

while ($pedido = $resultPedidos->fetch_assoc()) {

    $id_pedido = $pedido['id_pedido'];

    $sqlItens = "
        SELECT 
        p.nome,
        p.url_img,
        pe.quantidade,
        pe.preco_unitario
        FROM pedido_itens pe
        INNER JOIN produtos p ON pe.produto_id = p.id_produto
        WHERE pe.pedido_id = ?
    ";

    $stmt2 = $conn->prepare($sqlItens);
    $stmt2->bind_param("i", $id_pedido);
    $stmt2->execute();
    $resultItens = $stmt2->get_result();

    $itens = [];

    while ($item = $resultItens->fetch_assoc()) {
        $itens[] = $item;
    }

    $pedidos[] = [
        "id_pedido" => $id_pedido,
        "data" => $pedido['data_pedido'],
        "total"=>$pedido['total'],
        "itens" => $itens
    ];

    $stmt2->close();
}

$stmt->close();
$conn->close();

echo json_encode([
    "sucesso" => true,
    "pedidos" => $pedidos
]);
