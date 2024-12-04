let tablero = [];
let turno = 0;
let quienGano = [0, 0];
let ia = false;
let yaEnPartida = true;

function activarIA(elemento1, elemento2){
    ia = true;
    elemento1.style.opacity = 0;
    elemento2.style.opacity = 0;
    colocarTablero();
}

/*Todo los derechos reservados a Samuel Moniz*/

function JvJ(elemento1, elemento2) {
    elemento1.style.opacity = 0;
    elemento2.style.opacity = 0;
    ia = false;
    colocarTablero();
}

function quienJuega() {
    var elemento = document.querySelector('#turno');
    if (turno == 0) {
       elemento.style.background = 'yellow';
    }else {
       elemento.style.background = 'red'; 
    }
}

function colocarTablero() {
    yaEnPartida = false;
    var gridContainer = document.querySelector('#tablero');
    var elementoTurno = document.querySelector('#turno');
    elementoTurno.style.opacity = 1;
    for (var fila = 1; fila <= 6; fila++) {
        tablero[fila] = [];
        for (var columna = 1; columna <= 7; columna++) {
            var div = document.createElement('div');
            var ficha = document.createElement('div');
            ficha.style.background = 'blue';
            ficha.style.border = '2px solid black';
            div.classList.add('celda');
            ficha.classList.add('ficha');
            ficha.setAttribute('onclick', 'colocarFicha(this)');
            ficha.setAttribute('onmouseover', 'sombra(this)');
            ficha.setAttribute('onmouseout', 'quitarSombra(this)');
            div.setAttribute('data-columna', columna);
            div.appendChild(ficha);
            gridContainer.appendChild(div);
            tablero[fila][columna] = ficha;
        }
    }
    console.log(tablero);
    temp();
}

function temp() {
    var elemento = document.querySelector('#temporizador');
    setInterval
}

function colocarFicha(elemento) {
    if (ganar()) {
        console.log(tablero);
        var coloco = 0;
        var columna = elemento.parentElement.getAttribute('data-columna');
        for (let i = tablero.length - 1; i >= 1; i--) {
            if (tablero[i][columna].style.background === 'blue' && coloco === 0) {
                if (turno === 0) {
                    tablero[i][columna].style.background = 'yellow';
                    turno++;
                } else {
                    tablero[i][columna].style.background = 'red';
                    turno--;
                }
                tablero[i][columna].style.opacity = 1;
                coloco++;
            }
        }
    }
    if (ia) {
        logicaIA();
    }
    if (!ganar()) {
        var ganador = '';
        if (quienGano[0] === 1) {
            ganador = 'Gano el Amarillo <br>';
        } else if (quienGano[1] === 1) {
            ganador = 'Gano el Rojo <br>';
        }
        mostrarGanador(ganador, 'resultados');
    }
    quienJuega();
}

function logicaIA() { //Esto funciona como el orto
    var coloco = 0;
    var encontro = false;
    var jugador;
    var columna;
    for (let C = 0; C < 2; C++) {
        if (C == 0) {
            jugador = 'yellow';
        } else if (C == 1) {
            jugador = 'red';
        }
        for (let i = 1; i < tablero.length; i++) {
            for (let o = 1; o <= tablero[i].length - 4; o++) { // Horizontal
                if (tablero[i][o].style.background === jugador &&
                    tablero[i][o + 1].style.background === jugador &&
                    tablero[i][o + 2].style.background === jugador) {
                        columna = o + 3;
                        encontro = true;
                }
                if (tablero[i][o].style.background === jugador &&
                    tablero[i][o + 1].style.background === jugador &&
                    tablero[i][o + 3].style.background === jugador) {
                        columna = o + 2;
                        encontro = true;
                }
                if (tablero[i][o].style.background === jugador &&
                    tablero[i][o + 2].style.background === jugador &&
                    tablero[i][o + 3].style.background === jugador) {
                        columna = o + 1;
                        encontro = true;
                }
                if (tablero[i][o + 1].style.background === jugador &&
                    tablero[i][o + 2].style.background === jugador &&
                    tablero[i][o + 3].style.background === jugador) {
                        columna = o;
                        encontro = true;
                }
            }
        }
        for (let i = 1; i <= tablero.length - 4; i++) {
            for (let o = 1; o < tablero[i].length; o++) { // Vertical
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 1][o].style.background === jugador &&
                    tablero[i + 2][o].style.background === jugador) {
                        columna = o;
                        encontro = true;
                }
            }
        }
        for (let i = 1; i <= tablero.length - 4; i++) {
            for (let o = 1; o <= tablero[i].length - 4; o++) { // Diagonal Izquierda
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 1][o + 1].style.background === jugador &&
                    tablero[i + 2][o + 2].style.background === jugador) {
                        columna = o +3;
                        encontro = true;
                }
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 1][o + 1].style.background === jugador &&
                    tablero[i + 3][o + 3].style.background === jugador) {
                        columna = o +2;
                        encontro = true;
                }
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 2][o + 2].style.background === jugador &&
                    tablero[i + 3][o + 3].style.background === jugador) {
                        columna = o +1;
                        encontro = true;
                }
                if (tablero[i + 1][o + 1].style.background === jugador &&
                    tablero[i + 2][o + 2].style.background === jugador &&
                    tablero[i + 3][o + 3].style.background === jugador) {
                        columna = o;
                        encontro = true;
                }
            }
        }
        for (let i = 1; i <= tablero.length - 4; i++) {
            for (let o = 4; o < tablero[i].length; o++) { // Diagonal Derecha
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 1][o - 1].style.background === jugador &&
                    tablero[i + 2][o - 2].style.background === jugador) {
                        columna = o -3;
                        encontro = true;
                }
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 1][o - 1].style.background === jugador &&
                    tablero[i + 3][o - 3].style.background === jugador) {
                        columna = o -2;
                        encontro = true;
                }
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 2][o - 2].style.background === jugador &&
                    tablero[i + 3][o - 3].style.background === jugador) {
                        columna = o -1;
                        encontro = true;
                }
                if (tablero[i + 1][o - 1].style.background === jugador &&
                    tablero[i + 2][o - 2].style.background === jugador &&
                    tablero[i + 3][o - 3].style.background === jugador) {
                        columna = o;
                        encontro = true;
                }
            }
        }
    }
    if (!encontro) {
        do {
            columna = Math.floor(Math.random() * 7 + 1 );
        } while (!(tablero[1][columna] != 'blue'));
    }
    for (let i = tablero.length - 1; i >= 1; i--) {
        if (tablero[i][columna].style.background === 'blue' && coloco === 0) {
            if (turno === 0) {
                tablero[i][columna].style.background = 'yellow';
                turno++;
            } else {
                tablero[i][columna].style.background = 'red';
                turno--;
            }
            tablero[i][columna].style.opacity = 1;
            coloco++
        }
    }
}

function reiniciar(elemento) { //Me costo mas hacer el reinciar que todo el juego :(
    turno = 0;
    quienGano = [0, 0];
    var tablero = document.getElementById('tablero');
    var elementoTurno = document.querySelector('#turno');
    elementoTurno.style.background = 'yellow';
    elementoTurno.style.opacity = 0;
    // Eliminar todos los elementos hijos de tablero (sacado de la deep web)
    while (tablero.firstChild) {
        tablero.removeChild(tablero.firstChild);
    }
    var resultados = document.getElementById('resultados');
    var reiniciar = document.getElementById('reiniciar');
    var textoReiniciar = "";
    elemento.innerHTML = textoReiniciar;
    resultados.removeChild(reiniciar);
    resultados.innerHTML = textoReiniciar;
    var botonIA = document.getElementById('botonIA');
    var botonJ = document.getElementById('botonJ');
    botonIA.style.opacity = 1;
    botonJ.style.opacity = 1;
}

function ganar() {
    var jugador;
    for (let C = 0; C < 2; C++) {
        if (C == 0) {
            jugador = 'yellow';
        } else if (C == 1) {
            jugador = 'red';
        }
        for (let i = 1; i < tablero.length; i++) {
            for (let o = 1; o <= tablero[i].length - 4; o++) { // Horizontal
                if (tablero[i][o].style.background === jugador &&
                    tablero[i][o + 1].style.background === jugador &&
                    tablero[i][o + 2].style.background === jugador &&
                    tablero[i][o + 3].style.background === jugador) {
                    quienGano[C] = 1;
                    return false;
                }
            }
        }
        for (let i = 1; i <= tablero.length - 4; i++) {
            for (let o = 1; o < tablero[i].length; o++) { // Vertical
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 1][o].style.background === jugador &&
                    tablero[i + 2][o].style.background === jugador &&
                    tablero[i + 3][o].style.background === jugador) {
                    quienGano[C] = 1;
                    return false;
                }
            }
        }
        for (let i = 1; i <= tablero.length - 4; i++) {
            for (let o = 1; o <= tablero[i].length - 4; o++) { // Diagonal Izquierda
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 1][o + 1].style.background === jugador &&
                    tablero[i + 2][o + 2].style.background === jugador &&
                    tablero[i + 3][o + 3].style.background === jugador) {
                    quienGano[C] = 1;
                    return false;
                }
            }
        }
        for (let i = 1; i <= tablero.length - 4; i++) {
            for (let o = 4; o < tablero[i].length; o++) { // Diagonal Derecha
                if (tablero[i][o].style.background === jugador &&
                    tablero[i + 1][o - 1].style.background === jugador &&
                    tablero[i + 2][o - 2].style.background === jugador &&
                    tablero[i + 3][o - 3].style.background === jugador) {
                    quienGano[C] = 1;
                    return false;
                }
            }
        }
    }
    return true;
}

function IA(){

}

function mostrarGanador(variable, elementoId) {
    var elemento = document.getElementById(elementoId);
    var reiniciar = document.createElement('button');
    reiniciar.setAttribute('onclick', 'reiniciar(this)');
    var textoReiniciar = document.createTextNode('Reiniciar');//Me genera el texto dentro del boton
    reiniciar.id = 'reiniciar'; //Ya no se mas nombres :(
    textoReiniciar.id = 'textoReiniciar';
    reiniciar.appendChild(textoReiniciar)
    elemento.innerHTML = variable;
    elemento.appendChild(reiniciar);
}

function sombra(elemento) {
    var columna = elemento.parentElement.getAttribute('data-columna');
    for (let i = tablero.length - 1; i >= 1; i--) {
        if (tablero[i][columna].style.background === 'blue') {
            tablero[i][columna].style.opacity = 0.5;
        }
    }
}

function quitarSombra(elemento) {
    var columna = elemento.parentElement.getAttribute('data-columna');
    for (let i = tablero.length - 1; i >= 1; i--) {
        if (tablero[i][columna].style.background === 'blue' || tablero[i][columna].style.background === 'yellow' || tablero[i][columna].style.background === 'red') {
            tablero[i][columna].style.opacity = 1;
        }
    }
}
