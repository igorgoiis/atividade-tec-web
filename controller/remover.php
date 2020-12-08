<?php
$connect = mysqli_connect('localhost', 'root', '', 'controle_financeiro_db');

if (!empty($_GET)) {
  $query = "";
  $id = mysqli_real_escape_string($connect, $_GET['id']);

  if ($id != null) {
    $query = "delete from lancamentos where id = '$id'";
    $result = mysqli_query($connect, $query);
    
    if ($result > 0) {
      echo 'Excluído com sucesso!';
    } else {
      echo "Não foi possível excluir!";
    };

  }
}
?>