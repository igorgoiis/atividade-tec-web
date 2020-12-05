<?php
$connect = mysqli_connect('localhost', 'root', '', 'controle_financeiro_db');

if (!empty($_POST)) {
  $select_query = "";
  $categoria = mysqli_real_escape_string($connect, $_POST['categoria']);
  $titulo = mysqli_real_escape_string($connect, $_POST['titulo_receita']);
  $valor = mysqli_real_escape_string($connect, $_POST['valor_receita']);
  $data = mysqli_real_escape_string($connect, $_POST['data_receita']);
  $descricao = mysqli_real_escape_string($connect, $_POST['descricao_receita']);

  $query = "insert into lancamentos(titulo, valor, descricao, tipo, data)
  value ('$titulo', '$valor', '$descricao', '$categoria', '$data')";

  if(mysqli_query($connect, $query)) {
      $select_query = "select * from lacamentos order by id asc";
      $result = mysqli_query($connect, $select_query);
  }

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      echo "id: " . $row["id"]. " - Título: " . $row["titulo"]. " - Valor: " . $row["valor"]. "- Data: " . $row["data"]. "- Descrição: " . $row["descricao"]. "- Tipo: " . $row["tipo"]. "<br>";
    }
  } else {
    echo "0 results";
  };
}
?>