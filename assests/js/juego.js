
const miModulo = (() => {                                                       // Englobando todo mi codigo dentro de una funcion anonima auto invocada,evito que
    // el usuario tenga acceso a las variables y codigo del juego
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        figuras = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    // Refencias HTML

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHtml = document.querySelectorAll('small');

    // Funcion para iniciar juego

    const inicializarJuego = (numJugadores = 2) => {

        deck = crearDeck();

        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        };

        puntosHtml.forEach(elem => elem.innerText = 0);

        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;

    };

    // Funcion para crear deck
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {        // En este caso utilizare un ciclo for tradicional para crear los numeros
            for (let tipo of tipos) {          // En esta linea de codigo se utiliza un ciclo For of,para barrer el areglo
                //y  reutilizar el valor de i para concatenarlo a la variable tipo del ciclo For of
                deck.push(i + tipo);
            };

        };

        for (let tipo of tipos) {             // En estas lineas de codigo,creo nuevamente un ciclo For of,para crear las figuras
            // de la baraja, aprobechando la variable tipo del ciclo anterior la concateno al 
            // resultado de la variable de mi ciclo For of de las figuras
            for (let figura of figuras) {

                deck.push(figura + tipo);
            };

        };


        return _.shuffle(deck);              // Aqui utilizariamos el _.suffle de la libreria Underscore para recibir una baraja con orden aleatorio
    };



    const pedirCarta = () => {

        if (deck.length === 0) {

            throw 'No hay cartas en el deck';                 // Con la intruccion throw devolvemos un
            // error en caso de que se cumpla la condicion,de esta manera evitando un posible error,
            // cuando el usuario se quede sin cartas y quiera seguir pidiendo una
        };

        return deck.pop(); // Utilizo metodo pop() para borrar ultimo valor del array deck
    };

    // Funcion para obtener valor de carta

    const valorCarta = (carta) => {


        const valor = carta.substring(0, carta.length - 1);// De esta forma extraemos los dos primeros valores
        // de la carta,obviando la letra. Podriamos utilizar una expresion regular para obtener el mismo resultado,
        //pero en mi opinion me parece util utilizar el metodo .substring y que sea un poco mas elaborada la solucion

        //nota: JS nos da la posibilidad de  tratar a un string como una areglo. El metodo substring nos permite
        // obtener varios valores de un array ,desde un index a otro y devolviendo todos los valores entre estos dos


        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 // 1º Condicion del ternario
            : parseInt(valor);  // segunda condicion del ternario
    };


    // Turno: 0 = primer jugador y el ultimo sera la maquina

    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerHTML = puntosJugadores[turno];

        return puntosJugadores[turno];


    };
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assests/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta)

    };

    const deternimarGanador = () => {

        const [puntosMinimos, puntosMaquina] = puntosJugadores;

        setTimeout(() => {
            if (puntosMaquina === puntosMinimos) {

                alert('Nadie gana :(')
            } else if (puntosMinimos > 21) {

                alert('Maquina gana')

            } else if (puntosMaquina > 21) {

                alert('Jugador gana')
            }

        }, 25);
    };


    // Turno de la maquina

    const turnoMaquina = (puntosMinimos) => {
        let puntosMaquina = 0;

        do {
            const carta = pedirCarta();
            puntosMaquina = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);


        } while ((puntosMaquina < puntosMinimos) && (puntosMinimos <= 21));

        deternimarGanador();

    };




    btnPedir.addEventListener('click', () => { // Cuando una funcion se manda como argumento,
        // a otra funcion,esta se llamada funcion de callback// En este caso lo que estamos haciendo es que cuando detecte 
        // la acciond e click,se ejecute la linea de codigo dentro de la funciond e callback

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);


        if (puntosJugador > 21) {
            alert('Oh has perdido');
            // btnPedir.disabled = true;
            // btnDetener.disabled = true;
            turnoMaquina(puntosJugador);
        } else if (puntosJugador === 21) {
            // btnPedir.disabled = true;
            // btnDetener.disabled = true;
            turnoMaquina(puntosJugador);
        };


    });

    btnDetener.addEventListener('click', () => {

        // let puntosMaquina = 0;
        btnDetener.disabled = true;
        btnPedir.disabled = true;

        // const carta = pedirCarta();
        // let puntosJugador = acumularPuntos(carta, 0);
        // puntosMaquina = acumularPuntos(carta, 1);

        // console.log(puntosJugador);
        // console.log(puntosMaquina);




        // if (puntosMaquina < puntosJugador) {

        //     alert('Felicidades,has ganado!')
        //     // } else if (puntosMaquina > puntosMinimos) {
        //     //     alert('¡Ohhh,la maquina gana')
        //     // }

        // } else if (puntosMaquina > puntosJugador && puntosMaquina < 21) {
        //     alert('La maquina gana')
        // } else if (puntosMaquina === 21) {
        //     alert('La maquina ha llegado a 21,tu pierdes!')
        // }




        turnoMaquina(puntosJugadores[0]);

    });


    // Nuevo juego
    btnNuevo.addEventListener('click', () => {

        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();