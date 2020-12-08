<?php
$connect = mysqli_connect('localhost', 'root', '', 'controle_financeiro_db');

if (!empty($_POST)) {
  $select_query = "";
  $id = mysqli_real_escape_string($connect, $_POST['id']);
  $titulo = mysqli_real_escape_string($connect, $_POST['titulo_lancamento']);
  $valor = mysqli_real_escape_string($connect, $_POST['valor_lancamento']);
  $data = mysqli_real_escape_string($connect, $_POST['data_lancamento']);
  $descricao = mysqli_real_escape_string($connect, $_POST['descricao_lancamento']);

  $select_query = "select * from lancamentos where id = '$id'";

  $valor = doubleval(str_replace(".", "", $valor));

  $result = mysqli_query($connect, $select_query);
  if ($result->num_rows > 0) {
    $query = "update lancamentos set titulo = '$titulo', valor = '$valor', data = '$data', descricao = '$descricao' where id = '$id'";
    $result = mysqli_query($connect, $query);
    echo $result;
  } else {
    echo "0 results";
  };
}
?>