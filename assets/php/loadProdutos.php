<?php 
include 'config.php';
$sql ="select * from produtos";
$result = $conn->query($sql);
$produtos = [];
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $produtos[]=[
        "id" => $row["id_produto"],
        "nome" => $row["nome"],
        "preco" => $row["preco_unitario"],
        "estoque" => $row["estoque"],
        "tipo" => $row["tipo"],
        "destaque" => $row["destaque"],
        "urlImg" => $row["url_img"]
    ];
  }
} 
header('Content-Type: application/json; charset=utf-8');
echo json_encode($produtos);
exit;
?>