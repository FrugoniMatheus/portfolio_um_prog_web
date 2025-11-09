<?php
session_start();
if (isset($_SESSION['id_cliente'])) {
    function gerarIniciais($nomeCompleto) {
    $partes = explode(" ", trim($nomeCompleto));
    if (count($partes) < 2) return strtoupper(substr($partes[0], 0, 1));

    $primeiraLetraNome = substr($partes[0], 0, 1);
    $primeiraLetraSobrenome = substr(end($partes), 0, 1);

    return strtoupper($primeiraLetraNome . $primeiraLetraSobrenome);
}

$iniciais =  gerarIniciais($_SESSION['nome']); 
    echo json_encode([
        "logado" => true,
        "nome" => $_SESSION['nome'],
        "email" => $_SESSION['email'],
        "iniciais" => $iniciais
    ]);
} else {
    echo json_encode([
        "logado" => false
    ]);
}
?>