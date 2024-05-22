const game = {
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
    fin: null,
};

// Constantes
const KEY_ENTER = 13;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const BARRA = 32;
const phishingAwarenessMessages = [
    "No hagas clic en enlaces de correos electrónicos sospechosos. Podrían llevarte a sitios de phishing.",
    "Verifica siempre la URL antes de ingresar información confidencial. Podría ser un sitio de phishing.",
    "Los correos electrónicos de phishing a menudo tienen errores gramaticales o de ortografía.",
    "No compartas información personal o financiera a través de correos electrónicos no confiables.",
    "Los sitios web de phishing pueden intentar imitar sitios legítimos para engañarte."
];

// Objetos
class Bala {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
    }

    dibujar() {
        game.ctx.save();
        game.ctx.fillStyle = game.colorBala;
        game.ctx.fillRect(this.x, this.y, this.w, this.w);
        this.y -= 4;
        game.ctx.restore();
    }

    disparar() {
        game.ctx.save();
        game.ctx.fillStyle = game.colorBala2;
        game.ctx.fillRect(this.x, this.y, this.w, this.w);
        this.y += 3;
        game.ctx.restore();
    }
}

class Jugador {
    constructor(x) {
        this.x = x;
        this.y = 450;
        this.w = 30;
        this.h = 15;
    }

    dibujar(x) {
        this.x = x;
        game.ctx.drawImage(game.imagen, this.x, this.y, this.w, this.h);
    }
}

class Enemigo {
    constructor(x, y) {
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

    dibujar() {
        if (this.ciclos > 30) {
            if (this.veces > this.num) {
                this.dx *= -1;
                this.veces = 0;
                this.num = 28;
                this.y += 20;
                this.dx = (this.dx > 0) ? this.dx + 1 : this.dx - 1;
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
}

// Funciones
const caratula = () => {
    const imagen = new Image();
    imagen.src = "imagenes/cara.webp";
    imagen.onload = () => {
        game.ctx.drawImage(imagen, 0, 0);
    };
};

const seleccionar = () => {
    if (game.caratula) {
        inicio();
    }
};

const inicio = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.caratula = false;
    game.jugador = new Jugador(0);
    game.x = game.canvas.width / 2;
    game.jugador.dibujar(game.x);
    animar();
};

const animar = () => {
    if (!game.finJuego) {
        requestAnimationFrame(animar);
        verificar();
        pintar();
        colisiones();
    }
};

const colisiones = () => {
    for (let i = 0; i < game.enemigos_array.length; i++) {
        for (let j = 0; j < game.balas_array.length; j++) {
            const enemigo = game.enemigos_array[i];
            const bala = game.balas_array[j];

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

    for (let j = 0; j < game.balasEnemigas_array.length; j++) {
        const bala = game.balasEnemigas_array[j];

        if (bala && bala.x > game.jugador.x && bala.x < game.jugador.x + game.jugador.w && bala.y > game.jugador.y && bala.y < game.jugador.y + game.jugador.h) {
            gameOver();
        }
    }
};

const gameOver = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.balas_array = [];
    game.enemigos_array = [];
    game.balasEnemigas_array = [];
    game.finJuego = true;
    const randomMessage = getRandomPhishingMessage(phishingAwarenessMessages);
    alert(randomMessage);
    game.fin.play();
    mensaje("Game Over", 100, 60);
    mensaje(`Lograste ${game.puntos} puntos`, 220);

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
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

const sendScoreToBackend = (score) => {
    const token = localStorage.getItem("jwt"); // Obtén el token JWT almacenado en localStorage

    if (!token) {
        console.error("No se encontró el token JWT");
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({ score })
    };

    fetch('http://localhost:4000/api/user/setPhishingScore', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar el puntaje al servidor');
            }
            console.log('Puntaje enviado correctamente al servidor');
            // Aquí puedes redirigir a la página de perfil u otra acción necesaria
        })
        .catch(error => console.error('Error:', error));
};

const mensaje = (cadena, y, tamano = 40) => {
    const medio = game.canvas.width / 2;
    game.ctx.save();
    game.ctx.fillStyle = "green";
    game.ctx.strokeStyle = "blue";
    game.ctx.textBaseline = "top";
    game.ctx.font = `bold ${tamano}px Courier`;
    game.ctx.textAlign = "center";
    game.ctx.fillText(cadena, medio, y);
    game.ctx.restore();
};

const verificar = () => {
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

const dispararEnemigo = () => {
    const ultimos = [];

    for (let i = game.enemigos_array.length - 1; i > 0; i--) {
        if (game.enemigos_array[i] !== null) {
            ultimos.push(i);
        }

        if (ultimos.length === 10) break;
    }

    const d = ultimos[Math.floor(Math.random() * 10)];

    game.balasEnemigas_array.push(new Bala(game.enemigos_array[d].x + game.enemigos_array[d].w / 2, game.enemigos_array[d].y, 4));
};

const pintar = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

    score();
    game.jugador.dibujar(game.x);

    game.balas_array.forEach((bala, index) => {
        if (bala) {
            bala.dibujar();
            if (bala.y < 0) {
                game.disparo = false;
                game.balas_array[index] = null;
            }
        }
    });

    game.balasEnemigas_array.forEach((bala, index) => {
        if (bala) {
            bala.disparar();
            if (bala.y > game.canvas.height) game.balasEnemigas_array[index] = null;
        }
    });

    game.enemigos_array.forEach((enemigo) => {
        if (enemigo) {
            enemigo.dibujar();
        }
    });
};

const score = () => {
    game.ctx.save();
    game.ctx.fillStyle = "white";
    game.ctx.font = "bold 20px Courier";
    game.ctx.fillText(`SCORE: ${game.puntos}`, 10, 20);
    game.ctx.restore();
};

const backBtn = () => {
    window.location.href = "../../../../profile.html";
};

// Event Listeners
document.addEventListener("keydown", (e) => {
    game.teclaPulsada = e.keyCode;
    game.tecla[e.keyCode] = true;
});

document.addEventListener("keyup", (e) => {
    game.tecla[e.keyCode] = false;
});

window.requestAnimationFrame = (() => {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || ((callback) => window.setTimeout(callback, 17));
})();

window.onload = () => {
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
            game.imagenEnemigo.onload = () => {
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 10; j++) {
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