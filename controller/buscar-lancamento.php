<?php
$connect = mysqli_connect('localhost', 'root', '', 'controle_financeiro_db');

$select_query = "";
$id = mysqli_real_escape_string($connect, $_GET['id']);

$select_query = "select * from lancamentos where id = '$id'";
$result = mysqli_query($connect, $select_query);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $date = date_create($row["data"]);
    echo '
      <div class="modal-body">
        <div class="form-group">
          <label for="titulo_lancamento">Título</label>
          <input type="text" class="form-control" name="titulo_lancamento" id="titulo_lancamento" value="' . $row["titulo"] . '">
        </div>
        <div class="form-group">
          <label for="valor_lancamento">Valor</label>
          <input type="text" class="form-control" name="valor_lancamento" id="valor_lancamento" value="' . $row["valor"] . '">
        </div>
        <div class="form-group">
          <label for="data_lancamento">Data</label>
          <input class="form-control" type="date" name="data_lancamento" id="data_lancamento" value="' . date_format($date, 'Y-m-d') . '">
        </div>
        <div class="form-group">
          <label for="descricao_lancamento">Descrição</label>
          <textarea class="form-control" name="descricao_lancamento" id="descricao_lancamento" rows="3">' . $row["descricao"] . '</textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <input type="submit" class="btn btn-success" id="atualizar_lancamento" value="Salvar lancamento">
      </div>
    ';
  }
}
?>