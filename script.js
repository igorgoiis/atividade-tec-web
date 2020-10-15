let db = [];

agora = new Date;

data = agora.getDate() + '/' + agora.getMonth() + '/' + agora.getFullYear();
console.log(data);

function cadastrar() {
  data = agora.getDate() + '/' + agora.getMonth() + '/' + agora.getFullYear();
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
    inserir = inserir + '<tr><td><span>' + element.titulo + 
    '</span></td> <td><span>R$' + element.valor +
    '</span></td><td><span>' + element.categoria + 
    '</span></td><td><span>' + element.data + '</span></td></tr>';
    
  }
  tabela.innerHTML = inserir;
}

function entradas() {
  let totalEntrada = 0;
  let totalSaida = 0;
  for (let i = 0; i < db.length; i++) {
    const element = db[i];
    console.log(element.tipo)
    if (element.tipo == 'entrada') {
      totalEntrada = totalEntrada + parseFloat(element.valor);
    } else {
      totalSaida = totalSaida + parseFloat(element.valor);
    }
  }
  valorTotal = totalEntrada - totalSaida;
  entrada = document.getElementById('total-entrada');
  saida = document.getElementById('total-saida');
  total = document.getElementById('total-total');

  entrada.innerHTML = 'R$ ' + totalEntrada;
  saida.innerHTML = 'R$ ' + totalSaida;
  total.innerHTML = 'R$ ' + valorTotal;
}