$(document).ready(function() {
  url = 'http://localhost/controle-financeiro/controller';

  mostrarTabela();
  mostrarValores();

  $('#valor_receita').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: false});
  $('#valor_despesa').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: false});
  
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
          console.log(response);
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
  
  $(document).on('click', '.btn-edit', function(e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    $.ajax({
      type: 'GET',
      url: url + '/buscar-lancamento.php?id=' + id,
      success: function(response) {
        if (!response.error) {
          $('#editar_lancamento_form').html(response);
          $('#valor_lancamento').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: false});
        }
      },
      error: function(error) {
          console.error(error);
      }
    });
    $('#ModalEditarLancamento').modal('show');
    $(document).on('click', '#atualizar_lancamento', function(e) {
      e.preventDefault();
      $.ajax({
        url: url + "/atualizar.php",
        method: 'POST',
        data: $('#editar_lancamento_form').serialize() + '&id=' + id,
        success: function(response) {
          $('#ModalEditarLancamento').modal('hide');
          $('#editar_lancamento_form')[0].reset();
          mostrarTabela();
          mostrarValores();
        },
        error: function(error) {
          console.log(error);
        },
      });
    });
  });

  $(document).on('click', '.btn-remove', function(e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    const result = window.confirm('Quer realmente excluir esse lançamento?');

    if (result) {
      $.ajax({
        type: 'GET',
        url: url + '/remover.php?id=' + id,
        success: function(response) {
          if (!response.error) {
            mostrarTabela();
            mostrarValores();
          }
        },
        error: function(error) {
          console.error(error);
        }
      })
    }
  })

  function mostrarTabela() {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        contentType: false,
        url: url + '/buscar.php',    
        success: function(response) {
          if (!response.error) {
            $('#dados_tabela').html(response);
            valores = $('.valor');
            for (i=0; i<valores.length; i++){
              valor = parseFloat(valores[i].innerHTML);
              valores[i].innerHTML = valor.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' });
            }
          }
        },
        error: function(error) {
          console.log(error);
        },
      });
    }

  function mostrarValores() {
    $.ajax({
      type: 'GET',
      url: url + '/buscar-valores.php',    
      success: function(response) {
        if (!response.error) {
          totais = JSON.parse(response);
          receita_total = parseFloat(totais.receita);
          despesa_total = parseFloat(totais.despesa);
          if (isNaN(receita_total)) {
            receita_total = 0;
          }
          if (isNaN(despesa_total)) {
            despesa_total = 0;
          }
          total = receita_total - despesa_total;
          $('#total-entrada').html(receita_total.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' }));
          $('#total-saida').html(despesa_total.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' }));
          $('#total-total').html(total.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' })) ;
        }
      },
      error: function(error) {
        console.log(error);
      },
    });
    // let totalEntrada = 0.00;
    // let totalSaida = 0.00;
    // for (let i = 0; i < db.length; i++) {
    //   const element = db[i];
    //   if (element.categoria == 'Receita') {
    //     totalEntrada = totalEntrada + tirarPontos(element.valor);
    //   } else {
    //     totalSaida = totalSaida + tirarPontos(element.valor);
    //   }
    // }
    
    // valorTotal = totalEntrada - totalSaida;
    // $('#total-entrada').html(totalEntrada.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' }));
    // $('#total-saida').html(totalSaida.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' }));
    // $('#total-total').html(valorTotal.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' })) ;
  }
});

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