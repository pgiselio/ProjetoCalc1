var queryString = window.location.search.substring(11);
class Silo {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vida = 0;
    this.imagem = null;
  }
}

function desenharAltura(ctx, altura, y) {
  ctx.clear;
  ctx.beginPath();
  ctx.moveTo(75 + raio + 10, y);
  ctx.lineTo(75 + raio + 10, altura);

  ctx.font = "15px serif";
  ctx.fillText("h", 75 + raio + 15, altura / 2 + raio);

  ctx.stroke();
}
function desenharSilo(ctx, raio, altura, y) {
  ctx.beginPath();
//   ctx.arc(75, y, raio, 0, Math.PI, true); // Círculo exterior
//   ctx.quadraticCurveTo(75, raio + 25, raio + 75, y);
//   ctx.fill();

//   ctx.moveTo(raio + 75, y);
//   ctx.lineTo(raio + 75, altura);
//   ctx.moveTo(75 - raio, y);
//   ctx.lineTo(75 - raio, altura);
//   ctx.quadraticCurveTo(75, altura + 20, raio + 75, altura);
//   ctx.strokeStyle = "white";

  ctx.moveTo(75 + raio + 10, y);
  ctx.lineTo(75 + raio + 10, altura);

  ctx.font = "15px serif";
  ctx.fillText("h", 75 + raio + 15, altura / 2 + raio);

  ctx.stroke();
}

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  let raio = 38;
  let altura = 178;
  let y = 55;
  console.log(queryString);
  desenharSilo(ctx, raio, altura, y);
  if (queryString) gerarSilo(queryString);
});

function formSubmit(e) {
  e.preventDefault();
  gerarSilo();
  return false;
}
function gerarSilo(m) {
  let matricula;
  if (m) {
    matricula = m;
    document.querySelector("#matricula").value = m;
  } else {
    matricula = document.querySelector("#matricula").value;
  }
  if (isNaN(matricula)) {
    alert("Matrícula inválida");
    return false;
  }

  let volume = parseInt(matricula.substr(-4));
  let volumeAoQuadrado = Math.pow(volume, 2);
  let custoPorMetro = 0;
  let altura = 0;
  let raio = 0;
  let custoTotal = 0;
  let area = 0;

  //Custo por metro = soma dos algarismos da matricula
  for (let i = 0; i < matricula.length; i++) {
    custoPorMetro += parseFloat(matricula[i]);
  }


  altura = Math.pow((3 * volume) / Math.PI, 1 / 3);
  altura = altura.toFixed(3);

  raio = Math.pow((3 * volume) / (8 * Math.PI), 1 / 3) / 2;

  area = 2 * Math.PI * raio * altura + 2 * Math.PI * Math.pow(raio, 2);
  
  custoTotal =
    2 * custoPorMetro * Math.pow(9 * Math.PI * volumeAoQuadrado, 1 / 3);

    var custoTotal2 = ((4*volume*custoPorMetro/Math.pow(raio, 3)) + 16*Math.PI*custoPorMetro/3);
    custoTotal2 = 2 * 41* Math.PI * raio * altura + 2 *41* Math.PI * Math.pow(raio, 2);
    console.log(custoTotal2/area);
  document.querySelector("#raio").innerHTML = raio.toFixed(3).replace(".", ",");
  document.querySelector("#volume").innerHTML = volume;
  document.querySelector("#altura").innerHTML = altura
    .toString()
    .replace(".", ",");
  document.querySelector("#area").innerHTML = area.toFixed(3).replace(".", ",");
  document.querySelector("#custoPorMetro").innerHTML = custoPorMetro;
  document.querySelector("#custoTotal").innerHTML = custoTotal.toLocaleString(
    "pt-br",
    { minimumFractionDigits: 2 }
  );
}
