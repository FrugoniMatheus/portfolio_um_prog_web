<?php
session_start();

$id = $_POST['id_produto'];

unset($_SESSION['carrinho'][$id]);

echo json_encode(["sucesso" => true, "carrinho" => $_SESSION['carrinho']]);