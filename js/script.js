

let db = [];
agora = new Date;
data = agora.getDate() + '/' + agora.getMonth() + '/' + agora.getFullYear();

function cadastrarReceita() {
  titulo = document.getElementById('titulo').value;
  tipo = document.getElementById('tipo').value;
  valor = document.getElementById('valor').value;
  categoria = document.getElementById('categoria').value;
  
  
  dados = {
    titulo,
    tipo,
    valor,
    categoria,
    data
  }
  
  db.push(dados);
  mostrar();
  entradas();
}

function mostrar() {
  inserir = '';
  for (let i = 0; i < db.length; i++) {
    const element = db[i];
    tabela = document.getElementById('tabela');
    if (element.tipo == 'entrada') {
      inserir = inserir + '<tr><td><span>' + element.titulo + 
    '</span></td> <td><span style="color: #12A454;">R$' + element.valor.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' }) +
    '</span></td><td><span>' + element.categoria + 
    '</span></td><td><span>' + element.data + '</span></td></tr>';
    } else {
      inserir = inserir + '<tr><td><span>' + element.titulo + 
    '</span></td> <td><span style="color: #E83F5B;">R$' + element.valor.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' }) +
    '</span></td><td><span>' + element.categoria + 
    '</span></td><td><span>' + element.data + '</span></td></tr>';
    }
    
    
  }
  tabela.innerHTML = inserir;
}

function entradas() {
  let totalEntrada = 0.00;
  let totalSaida = 0.00;
  for (let i = 0; i < db.length; i++) {
    const element = db[i];
    if (element.tipo == 'entrada') {
      totalEntrada = totalEntrada + tirarPontos(element.valor);
    } else {
      totalSaida = totalSaida + tirarPontos(element.valor);
    }
  }

  totalEntrada = totalEntrada / 100;
  totalSaida = totalSaida / 100;
  
  valorTotal = totalEntrada - totalSaida;
  entrada = document.getElementById('total-entrada');
  saida = document.getElementById('total-saida');
  total = document.getElementById('total-total');

  entrada.innerHTML = totalEntrada.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' });
  saida.innerHTML = totalSaida.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' });
  total.innerHTML = valorTotal.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' });
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