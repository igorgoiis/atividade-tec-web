<?php
$connect = mysqli_connect('localhost', 'root', '', 'controle_financeiro_db');

$select_query = "select * from lancamentos order by data desc";
$result = mysqli_query($connect, $select_query);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $date = date_create($row["data"]);
    if ($row["tipo"] == 'Receita') {
      echo '
        <tr>
          <th scope="row" class="receita"><img src="./src/img/Entradas.svg" alt="Entrada"></th>
          <td class="titulo">' . $row["titulo"] . '</td>
          <td class="valor" style="color: #12A454;">' . $row["valor"] . '</td>
          <td class="descricao">' . $row["descricao"] . '</td>
          <td class="date">' . date_format($date, 'd/m/Y') . '</td>
          <td>
            <button type="button" data-id="' . $row["id"] . '" class="btn btn-outline-danger btn-remove">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button type="button" data-id="' . $row["id"] . '" class="btn btn-outline-warning btn-edit">
              <i class="fas fa-pencil"></i>
            </button>
          </td>
        </tr>
      ';
    } else {
      echo '
        <tr>
          <th scope="row" class="despesa"><img src="./src/img/Saídas.svg" alt="Saída"></th>
          <td class="titulo">' . $row["titulo"] . '</td>
          <td class="valor" style="color: #E83F5B;">' . $row["valor"] . '</td>
          <td class="descricao">' . $row["descricao"] . '</td>
          <td class="data">' . date_format($date, 'd/m/Y') . '</td>
          <td>
            <button type="button" data-id="' . $row["id"] . '" class="btn btn-outline-danger btn-remove">
            <i class="fas fa-trash-alt"></i>
            </button>
            <button type="button" data-id="' . $row["id"] . '" class="btn btn-outline-warning btn-edit">
              <i class="fas fa-pencil"></i>
            </button>
          </td>
        </tr>
      ';
    }
  }
} else {
  echo '
    <tr>
      <td></td>
      <td></td>
      <td style="text-align: right;">Não há lançamentos</td>
      <td></td>
      <td></td>
    </tr>
  ';
}
?>