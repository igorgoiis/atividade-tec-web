<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <link rel="stylesheet" href="./src/css/style.css">
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
  <title>Controle Financeiro</title>
</head>
<body>
  <header>
    <div class="container">
      <div class="display">
        <div class="entradas">
          <div class="titulo">
            <span>Entradas</span>
            <img src="./src/img/Entradas.svg" alt="Entrada">
          </div>
          <span id="total-entrada">R$ 00,00</span>
        </div>
        <div class="saidas">
          <div class="titulo">
            <span>Saídas</span>
            <img src="./src/img/Saídas.svg" alt="Saída">
          </div>
          <span id="total-saida">R$ 00,00</span>
        </div>
        <div class="total">
          <div class="titulo">
            <span>Total</span>
            <img src="./src/img/Total.svg" alt="">
          </div>
          <span id="total-total">R$ 00,00</span>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Título</th>
            <th scope="col">Preço</th>
            <th scope="col">Descrição</th>
            <th scope="col">Data</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="dados_tabela">
        </tbody>
      </table>
    </div>
  </main>
  <section>
    <div class="btn-group dropup">
      <button type="button" class="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fal fa-plus"></i>
      </button>
      <div class="dropdown-menu">
        <!-- Botão para acionar modal -->
        <button type="button" id="receita" class="btn btn-success receita" data-toggle="modal" data-target="#ModalReceita">
          <i class="far fa-arrow-up"></i>
        </button>
        <!-- Botão para acionar modal -->
        <button type="button" id="despesa" class="btn btn-danger despesa" data-toggle="modal" data-target="#ModalDespesa">
          <i class="far fa-arrow-down"></i>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="ModalReceita" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="TituloModalCentralizado">Cadastrar Receita</h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form method="POST" id="cadastro_receita_form">
            <div class="modal-body">
              <div class="form-group">
                <label for="titulo_receita">Título da Receita</label>
                <input type="text" class="form-control" id="titulo_receita" name="titulo_receita" placeholder="Salário">
              </div>
              <div class="form-group">
                <label for="valor_receita">Valor</label>
                <input type="text" class="form-control" name="valor_receita" id="valor_receita" placeholder="R$ 00,00">
              </div>
              <div class="form-group">
                <label for="data_receita">Data</label>
                <input class="form-control" type="date" name="data_receita" id="data_receita" value="<?php echo date('Y-m-d'); ?>">
              </div>
              <div class="form-group">
                <label for="descricao_receita">Descrição</label>
                <textarea class="form-control" name="descricao_receita" id="descricao_receita" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
              <input type="submit" class="btn btn-success" id="cadastrar_receita" value="Salvar receita">
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Confirmação Receita -->
    <div class="modal" id="ModalCadastroReceita" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Receita Cadastrada</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <div class="alert alert-success" role="alert">
            Receita cadastrada com sucesso!
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="ModalDespesa" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="TituloModalCentralizado">Cadastrar Despesa</h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form method="POST" id="cadastro_despesa_form">
            <div class="modal-body">
              <div class="form-group">
                <label for="titulo_despesa">Título da Despesa</label>
                <input type="text" class="form-control" name="titulo_despesa" id="titulo_despesa" placeholder="Aluguel">
              </div>
              <div class="form-group">
                <label for="valor_despesa">Valor</label>
                <input type="text" class="form-control" name="valor_despesa" id="valor_despesa" placeholder="R$ 00,00">
              </div>
              <div class="form-group">
                <label for="data_despesa">Data</label>
                <input class="form-control" type="date" name="data_despesa" id="data_despesa" value="<?php echo date('Y-m-d'); ?>">
              </div>
              <div class="form-group">
                <label for="descricao_despesa">Descrição</label>
                <textarea class="form-control" name="descricao_despesa" id="descricao_despesa" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
              <input type="submit" class="btn btn-danger" id="cadastrar_despesa" value="Salvar despesa">
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Confirmação Despesa -->
    <div class="modal" id="ModalCadastroDespesa" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Depesa Cadastrada</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <div class="alert alert-success" role="alert">
            Despesa cadastrada com sucesso!
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="ModalEditarLancamento" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="TituloModalCentralizado">Editar Lançamento</h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form method="POST" id="editar_lancamento_form">
           
          </form>
        </div>
      </div>
    </div>

  </section>

  <!-- JavaScript (Opcional) -->
  <!-- jQuery primeiro, depois Popper.js, depois Bootstrap JS -->
  <script src="./src/js/jquery.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  <script src="./src/js/jquery.maskMoney.min.js" type="text/javascript"></script>
  <script src="./src/js/script.js"></script>
</body>
</html>