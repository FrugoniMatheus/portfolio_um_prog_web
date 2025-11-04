<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
$dados = json_decode(file_get_contents("php://input"), true) ?? [];

$valid = $dados["valid"] ?? '';

if($valid === 1){
    $_SESSION = array();
    
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    
    // Finalmente, destrói a sessão
    session_destroy();
    
    // Retorna uma resposta JSON (caso use fetch)
    echo json_encode(["sucesso" => true, "mensagem" => "Sessão encerrada com sucesso."]);
}
else{
      echo json_encode(["sucesso" => false, "mensagem" => "Faha ao encerrar sessão"]);
}
?>