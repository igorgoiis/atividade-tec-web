<?php
$connect = mysqli_connect('localhost', 'root', '', 'controle_financeiro_db');

$select_query = "select * from lancamentos order by data desc";
$result = mysqli_query($connect, $select_query);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    echo '
      <tr>
        <td>' . $row["titulo"] . '</td>
        <td>' . $row["valor"] . '</td>
        <td>' . $row["descricao"] . '</td>
        <td>' . $row["tipo"] . '</td>
        <td>' . $row["data"] . '</td>
      </tr>
    ';
  }
} else {
      echo '
        <tr>
          <td></td>
          <td></td>
          <td>Não há lançamentos</td>
          <td></td>
          <td></td>
        </tr>
      ';
}
?>