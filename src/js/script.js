let db = [];
$(document).ready(function() {
  url = 'http://localhost/controle-financeiro/controller';
  mostrarTabela();
  $('#cadastro_receita_form').on('submit', function(e) {
    e.preventDefault();
    if ($('#titulo_receita').val() == '') {
      let alert =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Por favor preencha o nome!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
                  
      $('#TituloModalCentralizado').append(alert);
    } else if ($('#valor_receita').val() == '') {
      let alert =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Por favor preencha o valor!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
                  
      $('#TituloModalCentralizado').append(alert);
    } else if ($('#data_receita').val() == '') {
      let alert =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Por favor preencha a data!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
                  
      $('#TituloModalCentralizado').append(alert);
    } else {
      $.ajax({
        url: url + "/receita/cadastrar.php",
        method: 'POST',
        data: $('#cadastro_receita_form').serialize() + '&categoria=Receita',
        success: function(response) {
          $('#ModalReceita').modal('hide');
          $('#cadastro_receita_form')[0].reset();
          $('#ModalCadastroReceita').modal('show');
          mostrarTabela();
          mostrarValores();
        },
        error: function(error) {
          console.log(error);
        },
      });
    }
  });

  $('#cadastro_despesa_form').on('submit', function(e) {
    e.preventDefault();
    if ($('#titulo_despesa').val() == '') {
      let alert =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Por favor preencha o nome!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
                  
      $('#TituloModalCentralizado').append(alert);
    } else if ($('#valor_despesa').val() == '') {
      let alert =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Por favor preencha o valor!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
                  
      $('#TituloModalCentralizado').append(alert);
    } else if ($('#data_despesa').val() == '') {
      let alert =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Por favor preencha a data!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
                  
      $('#TituloModalCentralizado').append(alert);
    } else {
      $.ajax({
        url: url + "/despesa/cadastrar.php",
        method: 'POST',
        data: $('#cadastro_despesa_form').serialize() + '&categoria=Despesa',
        success: function(response) {
          $('#ModalDespesa').modal('hide');
          $('#cadastro_despesa_form')[0].reset();
          $('#ModalCadastroDespesa').modal('show');
          mostrarTabela();
          mostrarValores();
        },
        error: function(error) {
          console.log(error);
        },
      });
    }
  });


});

function mostrarTabela() {
  $.ajax({
    type: 'GET',
    dataType: 'html',
    contentType: false,
    url: url + '/buscar.php',    
    success: function(response) {
      if (!response.error) {
        console.log(response);
      }
    },
    error: function(error) {
      console.log(error);
    },
  });

  // for (let i = 0; i < db.length; i++) {
  //   const element = db[i];

  //   valor = tirarPontos(element.valor);
  //   if (element.categoria == 'Receita') {
  //     inserir = inserir + `
  //     <tr style="background: #D4EDDA;">
  //       <td>${element.titulo}</td>
  //       <td>${valor.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' })}</td>
  //       <td>${element.descricao}</td>
  //       <td>${element.categoria}</td>
  //       <td>${element.data}</td>
  //     </tr>`;
  //   } else {
  //     inserir = inserir + `
  //     <tr style="background: #F8D7DA;">
  //       <td>${element.titulo}</td>
  //       <td>${valor.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' })}</td>
  //       <td>${element.descricao}</td>
  //       <td>${element.categoria}</td>
  //       <td>${element.data}</td>
  //     </tr>`;
  //   }
  // }
  // $('#dados_tabela').html(inserir);
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

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};