<?php
$connect = mysqli_connect('localhost', 'root', '', 'controle_financeiro_db');

if (!empty($_POST)) {
  $select_query = "";
  $categoria = mysqli_real_escape_string($connect, $_POST['categoria']);
  $titulo = mysqli_real_escape_string($connect, $_POST['titulo_receita']);
  $valor = mysqli_real_escape_string($connect, $_POST['valor_receita']);
  $data = mysqli_real_escape_string($connect, $_POST['data_receita']);
  $descricao = mysqli_real_escape_string($connect, $_POST['descricao_receita']);
  
  $valor = str_replace(".", "", $valor);
  $valor = doubleval(str_replace(",", ".", $valor));
  
  $query = "insert into lancamentos(titulo, valor, descricao, tipo, data)
  value ('$titulo', $valor, '$descricao', '$categoria', '$data')";

  $result = mysqli_query($connect, $query);

  echo $result;
}
?>