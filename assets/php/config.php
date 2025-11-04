<?php
$servname ="localhost";
$username ='root';
$password ='';
$dbname = 'loja_new_sneakers';
$port = "3307";
$conn = new mysqli($servname,$username,$password,$dbname,$port);
if($conn ->connect_error){
    die("erro de conexão: " .$conn->connect_error);
}
?>
