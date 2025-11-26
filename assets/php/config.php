<?php
require __DIR__ . '/../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$servname =$_ENV['servname'];
$username =$_ENV['username'];
$password=$_ENV['password'];
$dbname=$_ENV['dbname'];
$port=$_ENV['port'];
 $conn = new mysqli($servname,$username,$password,$dbname,$port);
if($conn ->connect_error){
   die("erro de conexão: " .$conn->connect_error);
}
?>
