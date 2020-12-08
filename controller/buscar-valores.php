<?php
$connect = mysqli_connect('localhost', 'root', '', 'controle_financeiro_db');

$select_query = "";
$receita;
$totais = [];

$select_query_receita = "select sum(valor) from lancamentos where tipo = 'Receita'";
$select_query_despesa = "select sum(valor) from lancamentos where tipo = 'Despesa'";

$result = mysqli_query($connect, $select_query_receita);
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $totais['receita'] = $row['sum(valor)'];
  }
}

$result = mysqli_query($connect, $select_query_despesa);
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $totais['despesa'] = $row['sum(valor)'];
  }
}

echo(json_encode($totais));