function cronometroRegressivo() {
  var section = document.getElementById("conteudo");
  var h1List = section.getElementsByTagName("h1");

  var cronometro = document.getElementById('cronometro');

  var dataCasamento = new Date("11/03/2019")

  setInterval(function () {

    var contagemRegressiva = new Date();

    var diferenca = new Date(dataCasamento - contagemRegressiva);
    diferenca.setFullYear(dataCasamento.getFullYear() - contagemRegressiva.getFullYear());

    var anosRestantes = diferenca.getFullYear();
    var mesesRestantes = diferenca.getMonth();
    var diasRestantes = diferenca.getDate();
    var horasRestantes = diferenca.getHours();
    var minutosRestantes = diferenca.getMinutes();
    var segundosRestantes = diferenca.getSeconds();

    var tempoRestante = montaTempoRestante(anosRestantes, " ano, ", " anos, ");
    tempoRestante += montaTempoRestante(mesesRestantes, " mês, ", " meses, ");
    tempoRestante += montaTempoRestante(diasRestantes, " dia, ", " dias, ");
    tempoRestante += montaTempoRestante(horasRestantes, " hora, ", " horas, ");
    tempoRestante += montaTempoRestante(minutosRestantes, " minuto e ", " minutos e ");
    tempoRestante += montaTempoRestante(segundosRestantes, " segundo", " segundos", true);


    cronometro.innerText = tempoRestante;
  }, 1000);
}




function montaTempoRestante(valor, tempoSingular, tempoPlural, isSeconds) {
  var result = ""

  if (valor > 0 || isSeconds) {

    if (valor > 1) {
      result += valor + tempoPlural;
    } else {
      result += valor + tempoSingular;
    }
  }

  return result;
}

window.addEventListener("load", function() {
  cronometroRegressivo();
});