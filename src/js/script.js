let db = [];
$(document).ready(function() {
  $('#cadastrar_receita').on('click', function() {
    let titulo = $('#titulo_receita').val();
    let valor = $('#valor_receita').val();
    let data = $('#data_receita').val();
    let descricao = $('#descricao_receita').val();
    let categoria = 'Receita';

    if (!titulo || !valor || !data) {
      console.log($('#TituloModalCentralizado'));
      let alert =`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Todos os campos</strong> devem ser preenchidos!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
                  
      $('#TituloModalCentralizado').append(alert);
    } else {
      $('#ModalReceita').modal('toggle');
      $('#ModalCadastroReceita').modal('show');
      dados = {
        titulo,
        valor,
        data,
        descricao,
        categoria,
      }
      db.push(dados);
      inserirTabela();
      mostrarValores();
    }
  });

  $('#cadastrar_despesa').on('click', function() {
    let titulo = $('#titulo_despesa').val();
    let valor = $('#valor_despesa').val();
    let data = $('#data_despesa').val();
    let descricao = $('#descricao_despesa').val();
    let categoria = 'Despesa';

    if (!titulo || !valor || !data) {
      console.log($('#TituloModalCentralizado'));
      let alert =`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Todos os campos</strong> devem ser preenchidos!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
                  
      $('#TituloModalCentralizado').append(alert);
    } else {
      $('#ModalDespesa').modal('toggle');
      $('#ModalCadastroDespesa').modal('show');
      dados = {
        titulo,
        valor,
        data,
        descricao,
        categoria,
      }
      db.push(dados);
      inserirTabela();
      mostrarValores();
    }
  });


});

function inserirTabela() {
  inserir = '';
  for (let i = 0; i < db.length; i++) {
    const element = db[i];

    valor = tirarPontos(element.valor);

    if (element.categoria == 'Receita') {
      inserir = inserir + `
      <tr style="background: #D4EDDA;">
        <td>${element.titulo}</td>
        <td>${valor.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' })}</td>
        <td>${element.descricao}</td>
        <td>${element.categoria}</td>
        <td>${element.data}</td>
      </tr>`;
    } else {
      inserir = inserir + `
      <tr style="background: #F8D7DA;">
        <td>${element.titulo}</td>
        <td>${valor.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' })}</td>
        <td>${element.descricao}</td>
        <td>${element.categoria}</td>
        <td>${element.data}</td>
      </tr>`;
    }
  }
  $('#dados_tabela').html(inserir);
}

function mostrarValores() {
  let totalEntrada = 0.00;
  let totalSaida = 0.00;
  for (let i = 0; i < db.length; i++) {
    const element = db[i];
    if (element.categoria == 'Receita') {
      totalEntrada = totalEntrada + tirarPontos(element.valor);
    } else {
      totalSaida = totalSaida + tirarPontos(element.valor);
    }
  }
  
  valorTotal = totalEntrada - totalSaida;
  $('#total-entrada').html(totalEntrada.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' }));
  $('#total-saida').html(totalSaida.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' }));
  $('#total-total').html(valorTotal.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' })) ;
}

function tirarPontos(num) {
  let temp = '';
  temp = num.split('.');
  let aux = "";
  for (let i = 0; i < temp.length; i++) {
    const element = temp[i];
    aux = aux + element;
  }
  num = aux;
  
  temp = num.split(',');
  aux = "";
  for (let i = 0; i < temp.length; i++) {
    const element = temp[i];
    aux = aux + element;
  }
  num = parseFloat(aux);

  return num;
}