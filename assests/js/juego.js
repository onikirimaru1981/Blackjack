
(() => {                                                       // Englobando todo mi codigo dentro de una funcion anonima auto invocada,evito que
    // el usuario tenga acceso a las variables y codigo del juego
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        figuras = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,                                    // En este caso para ahorrar algo de codigo,hemos aprobechado el let de la variable puntosJugador,
        // y simplemente poniendo una coma en la primera variable,podemos crear una segunda sin utilizar el let
        puntosMaquina = 0;


    // Refencias HTML

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const cartasJugador = document.querySelector("#jugador-cartas"),
        cartasMaquina = document.querySelector("#maquina-cartas"),
        puntosHtml = document.querySelectorAll('small');


    const inicializarJuego = () => {

        deck = crearDeck();
    };


    // Creacion de deck: necesito recrear todos los numeros de un deck para blackjack,tomando como referencia las imagenes 
    //obtenidas en internet de una baraja con nombres ingleses,y teniendo en cuenta que empiezan por dos y terminan en 10,
    //crearemos una funcion para obtener todos los numeros

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
            // resultado de la variable de mi  ciclo For of de las figuras
            for (let figura of figuras) {

                deck.push(figura + tipo);
            };

        };


        return _.shuffle(deck)                // Aqui utilizariamos el _.suffle de Underscore para recibir una baraja con orden aleatorio
    };

    //Nota,para ordenar de forma aleatoria las variables de mi areglo deck,utilizare una libreria a 3º llamada Underscore





    // Funcion para crear carta
    // Tener en cuenta las condiciones a suponer. Si tomo una carta esta deberia desaparecer del areglo
    // Subsanar posibles errores que puedan surgor con la funcion



    const pedirCarta = () => {

        if (deck.length === 0) {

            throw 'No hay cartas en el deck';                 // Con la intruccion throw devolvemos un
            // error en caso de que se cumpla la condicion,de esta manera evitando un posible error,
            // cuando el usuario se quede sin cartas y quiera seguir pidiendo una
        };

        return deck.pop(); // Retorno la carta,// Utilizo metodo pop() para borrar ultimo valor del array
    };


    const valorCarta = (carta) => {


        const valor = carta.substring(0, carta.length - 1);// De esta forma extraemos los dos primeros valores
        // de la carta,obviando la letra. Podriamos utilizar una expresion regular para obtener el mismo resultado,
        //pero en mi opinion me parece util utilizar el metodo .substring y que sea un poco mas elaborada la solucion

        //nota: JS nos da la posibilidad de  tratar a un string como una areglo. El metodo substring nos permite
        // obtener varios valores de un array ,desde un index a otro y devolviendo todos los valores entre estos dos

        // Se ha obtado por simplificar la funcion dejando el codigo anterior para ver porque llegue a esta resolucion
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 // 1º Condicion del ternario
            : parseInt(valor);  // segunda condicion del ternario

        //puntos = 0;
        // if (isNaN(valor)) {
        //     // console.log('No es un numero');

        //     puntos = valor === 'A' ? 11 : 10
        // } else {
        //     // console.log('Es un numero');
        //     puntos = parseInt(valor); // Algo a tener en cuenta es que si queremos sumar numeros es necesario que este sea 
        //     // number,ya que lo que estamos evaluando es un string y si sumaramos dos string,daria como 
        //     //resultado algo que no deseamos
        // };


        // console.log(puntos);


    };



    const valor = valorCarta(pedirCarta())

    // Turno de la maquina

    const turnoMaquina = (puntosMinimos) => {

        do {
            const carta = pedirCarta();

            puntosMaquina = puntosMaquina + valorCarta(carta)
            console.log('maquina', puntosMaquina);

            puntosHtml[1].innerHTML = puntosMaquina;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assests/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            cartasMaquina.append(imgCarta);

            if (puntosMinimos > 21) {// Esta instruccion tiene como finalidad de que si eñ jugador
                // sacara un 22,la maquina automaticamente ganaria,ya que no tiene razon de ser seguir.
                break;

            };

        } while ((puntosMaquina < puntosMinimos) && (puntosMinimos <= 21));


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





    // console.log({ valor });


    // Eventos

    // Podemos definir la sintaxis con una funcion normal

    // btnPedir.addEventListener('click', function () { }); // Cuando una funcion se manda como argumento,
    //es llamada funcion de callback



    // O bien utilizando una funcion flecha(recomendado)


    btnPedir.addEventListener('click', () => { // Cuando una funcion se manda como argumento,
        // a otra funcion,esta se llamada funcion de callback// En este caso lo que estamos haciendo es que cuando detecte 
        // la acciond e click,se ejecute la linea de codigo dentro de la funciond e callback

        const carta = pedirCarta();// Con esta linea de codigo lo que se espera es que llame a la funcion pedirCarta()
        // creada con anterioridad

        puntosJugador = puntosJugador + valorCarta(carta) // En esta linea lo que estamos haciendo,es tener en cuenta el valor
        // de la carta obtenida con la funcion valorCarta(),y sumandolo a la variable creada e inicializada a 0

        puntosHtml[0].innerHTML = puntosJugador;

        // El siguiente apartado es para crear la carta en el html

        // <img class="carta" src="assests/cartas/10C.png" alt=""></img>
        const imgCarta = document.createElement('img'); // con esta linea creamos el elemento de la carta
        imgCarta.src = `assests/cartas/${carta}.png`;// con esta linea indicamos de donde tiene que coger  la carta
        imgCarta.classList.add('carta')// con esta linea asignamos la clase a la imqagen creada
        cartasJugador.append(imgCarta);// // con esta linea de codigo añadimos la carta al html



        // Controlar los puntos

        if (puntosJugador > 21) {
            alert('Oh has perdido');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoMaquina(puntosJugador);
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoMaquina(puntosJugador);
        }

        console.log(puntosJugador);

        // console.log('Click');// con este log comprobamos que la accion se registra correctamente

    });

    btnDetener.addEventListener('click', () => {

        btnDetener.disabled = true;
        btnPedir.disabled = true;
        console.warn('Juego Detenido');
        setTimeout(() => {
            if (puntosMaquina < puntosJugador) {

                alert('Felicidades,has ganado!')
                // } else if (puntosMaquina > puntosMinimos) {
                //     alert('¡Ohhh,la maquina gana')
                // }

            } else if (puntosMaquina > puntosJugador && puntosMaquina < 21) {
                alert('La maquina gana')
            } else if (puntosMaquina === 21) {
                alert('La maquina ha llegado a 21,tu pierdes!')
            }

        }, 30);


        turnoMaquina(puntosJugador);



    });


    // Nuevo juego
    btnNuevo.addEventListener('click', () => {
        console.clear

        location.reload();
        inicializarJuego();
    });

})();

