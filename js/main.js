var queryString = window.location.search.substring(11);
var canvas = document.getElementById("canvas");
var ctx;

let siloCanvaStats = {
  raio: 38,
  altura: 176,
  y: 55,
};
function desenharAltura(
  raio = siloCanvaStats.raio,
  altura = siloCanvaStats.altura,
  y = siloCanvaStats.y
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.classList.remove("playVolumer");
  canvas.classList.add("altura");
  setTimeout(() => {
    canvas.classList.add("playVolumer");
  }, 100);
  setTimeout(() => {
    canvas.classList.remove("altura");
  }, 1500);
  setTimeout(() => {
    canvas.classList.remove("playVolumer");
  }, 1500);

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";

  ctx.moveTo(75 + raio + 10, y);
  ctx.lineTo(75 + raio + 10, altura);

  ctx.font = "15px serif";
  ctx.fillText("h", 75 + raio + 15, altura / 2 + raio);

  ctx.stroke();
}

function desenharVolumer(
  raio = siloCanvaStats.raio,
  altura = siloCanvaStats.altura,
  y = siloCanvaStats.y
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.classList.remove("playVolumer");
  canvas.classList.add("volumer");
  setTimeout(() => {
    canvas.classList.add("playVolumer");
  }, 100);
  setTimeout(() => {
    canvas.classList.remove("volumer");
  }, 1500);
  setTimeout(() => {
    canvas.classList.remove("playVolumer");
  }, 1500);

  ctx.beginPath();
  ctx.fillStyle = "#00ffff20";
  ctx.strokeStyle = "black";

  ctx.moveTo(raio + 75, y);
  ctx.lineTo(raio + 75, altura);
  ctx.moveTo(75 - raio, y);
  ctx.lineTo(75 - raio, altura);
  ctx.quadraticCurveTo(75, altura + 25, raio + 75, altura);
  ctx.lineTo(raio * 3 - 2, y);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(75, y, raio - 1, 0, Math.PI, true); // Círculo exterior
  ctx.lineTo(raio * 3 - 2, y);

  ctx.fill();
}
function desenharSilo(
  raio = siloCanvaStats.raio,
  altura = siloCanvaStats.altura,
  y = siloCanvaStats.y
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "black";

  ctx.moveTo(raio + 75, y);
  ctx.lineTo(raio + 75, altura);
  ctx.moveTo(75 - raio, y);
  ctx.lineTo(75 - raio, altura);
  ctx.quadraticCurveTo(75, altura + 25, raio + 75, altura);
  ctx.lineTo(raio * 3 - 2, y);
  ctx.stroke();
  // ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.arc(75, y, raio, 0, Math.PI, true); // Círculo exterior
  ctx.quadraticCurveTo(75, raio + 25, raio + 75, y);
  ctx.stroke();

}

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  console.log(queryString);
  desenharAltura();
  if (queryString) gerarSilo(queryString);
  else gerarSilo();
  let matriculaInput = document.querySelector("#matricula");
  ["keyup", "onpaste", "oninput"].forEach((event) => {
    matriculaInput.addEventListener(event, () => {
      gerarSilo();
    });
  });
});

function formSubmit(e) {
  e.preventDefault();
  gerarSilo();
  return false;
}

function gerarSilo(m) {
  let matricula;
  let matriculaInput = document.querySelector("#matricula");
  matriculaInput.classList.remove("is-invalid");

  if (m) {
    matricula = m;
    document.querySelector("#matricula").value = m;
  } else {
    matricula = matriculaInput.value;
  }

  matricula = matricula.trim();

  if (isNaN(matricula) || !matricula || /^\s*$/.test(matricula)) {
    matriculaInput.classList.add("is-invalid");
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

  raio = Math.pow((3 * volume) / (8 * Math.PI), 1 / 3);

  area = 2 * Math.PI * raio * altura + 2 * Math.PI * Math.pow(raio, 2);

  custoTotal =
    2 * custoPorMetro * Math.pow(9 * Math.PI * volumeAoQuadrado, 1 / 3);
  
  // var custoTotal2 = ((4*volume*custoPorMetro/Math.pow(raio, 3)) + 16*Math.PI*custoPorMetro/3);
  document.querySelector("#raio").innerHTML = raio.toFixed(3).replace(".", ",");
  document.querySelector("#volume").innerHTML = volume;
  document.querySelector("#altura").innerHTML = altura
    .toFixed(3)
    .toString()
    .replace(".", ",");
  document.querySelector("#area").innerHTML = area.toFixed(3).replace(".", ",");
  document.querySelector("#custoPorMetro").innerHTML = custoPorMetro;
  document.querySelector("#custoTotal").innerHTML = custoTotal.toLocaleString(
    "pt-br",
    { minimumFractionDigits: 2 }
  );
}
