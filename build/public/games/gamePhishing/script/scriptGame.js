"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var game = {
  canvas: null,
  ctx: null,
  imagen: null,
  caratula: true,
  imagenEnemigo: null,
  teclaPulsada: null,
  tecla: [],
  colorBala: "red",
  colorBala2: "yellow",
  balas_array: [],
  balasEnemigas_array: [],
  enemigos_array: [],
  disparo: false,
  puntos: 0,
  finJuego: false,
  boing: null,
  disparoJugador: null,
  intro: null,
  fin: null
};

// Constantes
var KEY_ENTER = 13;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var BARRA = 32;
var phishingAwarenessMessages = ["No hagas clic en enlaces de correos electrónicos sospechosos. Podrían llevarte a sitios de phishing.", "Verifica siempre la URL antes de ingresar información confidencial. Podría ser un sitio de phishing.", "Los correos electrónicos de phishing a menudo tienen errores gramaticales o de ortografía.", "No compartas información personal o financiera a través de correos electrónicos no confiables.", "Los sitios web de phishing pueden intentar imitar sitios legítimos para engañarte."];

// Objetos
var Bala = /*#__PURE__*/function () {
  function Bala(x, y, w) {
    _classCallCheck(this, Bala);
    this.x = x;
    this.y = y;
    this.w = w;
  }
  return _createClass(Bala, [{
    key: "dibujar",
    value: function dibujar() {
      game.ctx.save();
      game.ctx.fillStyle = game.colorBala;
      game.ctx.fillRect(this.x, this.y, this.w, this.w);
      this.y -= 4;
      game.ctx.restore();
    }
  }, {
    key: "disparar",
    value: function disparar() {
      game.ctx.save();
      game.ctx.fillStyle = game.colorBala2;
      game.ctx.fillRect(this.x, this.y, this.w, this.w);
      this.y += 3;
      game.ctx.restore();
    }
  }]);
}();
var Jugador = /*#__PURE__*/function () {
  function Jugador(x) {
    _classCallCheck(this, Jugador);
    this.x = x;
    this.y = 450;
    this.w = 30;
    this.h = 15;
  }
  return _createClass(Jugador, [{
    key: "dibujar",
    value: function dibujar(x) {
      this.x = x;
      game.ctx.drawImage(game.imagen, this.x, this.y, this.w, this.h);
    }
  }]);
}();
var Enemigo = /*#__PURE__*/function () {
  function Enemigo(x, y) {
    _classCallCheck(this, Enemigo);
    this.x = x;
    this.y = y;
    this.w = 35;
    this.veces = 0;
    this.dx = 5;
    this.ciclos = 0;
    this.num = 14;
    this.figura = true;
    this.vive = true;
  }
  return _createClass(Enemigo, [{
    key: "dibujar",
    value: function dibujar() {
      if (this.ciclos > 30) {
        if (this.veces > this.num) {
          this.dx *= -1;
          this.veces = 0;
          this.num = 28;
          this.y += 20;
          this.dx = this.dx > 0 ? this.dx + 1 : this.dx - 1;
        } else {
          this.x += this.dx;
        }
        this.veces++;
        this.ciclos = 0;
        this.figura = !this.figura;
      } else {
        this.ciclos++;
      }
      if (this.figura) {
        game.ctx.drawImage(game.imagenEnemigo, 0, 0, 40, 30, this.x, this.y, 35, 30);
      } else {
        game.ctx.drawImage(game.imagenEnemigo, 50, 0, 35, 30, this.x, this.y, 35, 30);
      }
    }
  }]);
}(); // Funciones
var caratula = function caratula() {
  var imagen = new Image();
  imagen.src = "imagenes/cara.webp";
  imagen.onload = function () {
    game.ctx.drawImage(imagen, 0, 0);
  };
};
var seleccionar = function seleccionar() {
  if (game.caratula) {
    inicio();
  }
};
var inicio = function inicio() {
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.caratula = false;
  game.jugador = new Jugador(0);
  game.x = game.canvas.width / 2;
  game.jugador.dibujar(game.x);
  animar();
};
var animar = function animar() {
  if (!game.finJuego) {
    requestAnimationFrame(animar);
    verificar();
    pintar();
    colisiones();
  }
};
var colisiones = function colisiones() {
  for (var i = 0; i < game.enemigos_array.length; i++) {
    for (var j = 0; j < game.balas_array.length; j++) {
      var enemigo = game.enemigos_array[i];
      var bala = game.balas_array[j];
      if (enemigo && bala && bala.x > enemigo.x && bala.x < enemigo.x + enemigo.w && bala.y > enemigo.y && bala.y < enemigo.y + enemigo.w) {
        enemigo.vive = false;
        game.enemigos_array[i] = null;
        game.balas_array[j] = null;
        game.disparo = false;
        game.puntos += 10;
        game.boing.play();
      }
    }
  }
  for (var _j = 0; _j < game.balasEnemigas_array.length; _j++) {
    var _bala = game.balasEnemigas_array[_j];
    if (_bala && _bala.x > game.jugador.x && _bala.x < game.jugador.x + game.jugador.w && _bala.y > game.jugador.y && _bala.y < game.jugador.y + game.jugador.h) {
      gameOver();
    }
  }
};
var gameOver = function gameOver() {
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.balas_array = [];
  game.enemigos_array = [];
  game.balasEnemigas_array = [];
  game.finJuego = true;
  var randomMessage = getRandomPhishingMessage(phishingAwarenessMessages);
  alert(randomMessage);
  game.fin.play();
  mensaje("Game Over", 100, 60);
  mensaje("Lograste ".concat(game.puntos, " puntos"), 220);
  if (game.puntos > 100 || game.puntos <= 200) {
    mensaje("Casi lo logras", 340);
  } else if (game.puntos > 200) {
    mensaje("Felicitaciones", 340);
  } else {
    mensaje("Lo sentimos", 340);
  }
  sendScoreToBackend(game.puntos);
};
function getRandomPhishingMessage(messages) {
  var randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}
var sendScoreToBackend = function sendScoreToBackend(score) {
  var token = localStorage.getItem("jwt"); // Obtén el token JWT almacenado en localStorage

  if (!token) {
    console.error("No se encontró el token JWT");
    return;
  }
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({
      score: score
    })
  };
  fetch('http://localhost:4000/api/user/setPhishingScore', requestOptions).then(function (response) {
    if (!response.ok) {
      throw new Error('Error al enviar el puntaje al servidor');
    }
    console.log('Puntaje enviado correctamente al servidor');
    // Aquí puedes redirigir a la página de perfil u otra acción necesaria
  })["catch"](function (error) {
    return console.error('Error:', error);
  });
};
var mensaje = function mensaje(cadena, y) {
  var tamano = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;
  var medio = game.canvas.width / 2;
  game.ctx.save();
  game.ctx.fillStyle = "green";
  game.ctx.strokeStyle = "blue";
  game.ctx.textBaseline = "top";
  game.ctx.font = "bold ".concat(tamano, "px Courier");
  game.ctx.textAlign = "center";
  game.ctx.fillText(cadena, medio, y);
  game.ctx.restore();
};
var verificar = function verificar() {
  if (game.tecla[KEY_RIGHT]) game.x += 10;
  if (game.tecla[KEY_LEFT]) game.x -= 10;
  if (game.x > game.canvas.width - 10) game.x = game.canvas.width - 10;
  if (game.x < 0) game.x = 10;
  if (game.tecla[BARRA]) {
    if (!game.disparo) {
      game.balas_array.push(new Bala(game.jugador.x + 12, game.jugador.y - 3, 5));
      game.tecla[BARRA] = false;
      game.disparo = true;
      game.disparoJugador.play();
    }
  }
  if (Math.random() > 0.972) {
    dispararEnemigo();
  }
};
var dispararEnemigo = function dispararEnemigo() {
  var ultimos = [];
  for (var i = game.enemigos_array.length - 1; i > 0; i--) {
    if (game.enemigos_array[i] !== null) {
      ultimos.push(i);
    }
    if (ultimos.length === 10) break;
  }
  var d = ultimos[Math.floor(Math.random() * 10)];
  game.balasEnemigas_array.push(new Bala(game.enemigos_array[d].x + game.enemigos_array[d].w / 2, game.enemigos_array[d].y, 4));
};
var pintar = function pintar() {
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  score();
  game.jugador.dibujar(game.x);
  game.balas_array.forEach(function (bala, index) {
    if (bala) {
      bala.dibujar();
      if (bala.y < 0) {
        game.disparo = false;
        game.balas_array[index] = null;
      }
    }
  });
  game.balasEnemigas_array.forEach(function (bala, index) {
    if (bala) {
      bala.disparar();
      if (bala.y > game.canvas.height) game.balasEnemigas_array[index] = null;
    }
  });
  game.enemigos_array.forEach(function (enemigo) {
    if (enemigo) {
      enemigo.dibujar();
    }
  });
};
var score = function score() {
  game.ctx.save();
  game.ctx.fillStyle = "white";
  game.ctx.font = "bold 20px Courier";
  game.ctx.fillText("SCORE: ".concat(game.puntos), 10, 20);
  game.ctx.restore();
};
var backBtn = function backBtn() {
  window.location.href = "../../../../profile.html";
};

// Event Listeners
document.addEventListener("keydown", function (e) {
  game.teclaPulsada = e.keyCode;
  game.tecla[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
  game.tecla[e.keyCode] = false;
});
window.requestAnimationFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 17);
  };
}();
window.onload = function () {
  game.canvas = document.getElementById("canvas");
  if (game.canvas && game.canvas.getContext) {
    game.ctx = canvas.getContext("2d");
    if (game.ctx) {
      game.boing = document.getElementById("boing");
      game.disparoJugador = document.getElementById("disparo");
      game.intro = document.getElementById("intro");
      game.fin = document.getElementById("fin");
      game.imagen = new Image();
      game.imagen.src = "imagenes/torre.fw.png";
      game.imagenEnemigo = new Image();
      game.imagenEnemigo.src = "imagenes/invader.fw.png";
      game.imagenEnemigo.onload = function () {
        for (var i = 0; i < 5; i++) {
          for (var j = 0; j < 10; j++) {
            game.enemigos_array.push(new Enemigo(100 + 40 * j, 30 + 45 * i));
          }
        }
      };
      caratula();
      game.canvas.addEventListener("click", seleccionar, false);
    } else {
      alert("NO cuentas con CANVAS");
    }
  }
};