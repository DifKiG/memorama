//Creo mi arreglo de los números que seran parte del juego
let numeros = [ 1,2,3,4,5,6,7,8,9,10]

let primeraTarjeta = null;
let segundaTarjeta = null;
let puedeClickear = true;


//Condiciones para terminar el juego
const maxTurnos = 30;
let turnosRealizados = 0;
let parejasEncontradas = 0;
const totalPares = numeros.length;

iniciarTablero(numeros)

function iniciarTablero(numeros){

    //Duplico los números para obtener parejas
    let numerosDuplicados = [...numeros, ...numeros]

    //Ordenar las posiciones de manera aleatoria
    numerosDuplicados.sort( ()=> Math.random() - 0.5)

    //Obtengo la referencia al objeto del tablero
    const divTablero = document.getElementById('tablero')

    //Valido que existe el tablero
    if(divTablero){

        //Recorro cada uno de los números de mi arreglo
        for (const numero of numerosDuplicados) {

            //Creo un elemento DIV
            let divTarjeta = document.createElement('div')

            //Le agrego la clase que contiene los estilos para que luzca como una tarjeta
            divTarjeta.classList.add('grid-item')

            //Agrego el numero al objeto dataset de la tarjeta
            divTarjeta.dataset.valorNumero = numero

            //Agregamos evento de Click a cada Tarjeta
            divTarjeta.addEventListener('click',evaluar)

            //Agrego el DIV al tablero
            divTablero.appendChild(divTarjeta)

        }

    }

}

function evaluar(event){

    if(puedeClickear == false){
        return;
    }

    //Obtenemos la tarjeta seleccionada
    let tarjetaSeleccionada = event.target

    //Validamos que no se puede accionar 2 veces la misma tarjeta
    if(tarjetaSeleccionada === primeraTarjeta || tarjetaSeleccionada === segundaTarjeta){
        return;
    }

    //Obtemenos el número de la tarjeta
    let numeroSeleccionado = tarjetaSeleccionada.dataset.valorNumero;

    //Seteamos el numero como parte del contenido del DIV
    tarjetaSeleccionada.textContent = numeroSeleccionado;

    //Identificamos la seleccion a que tarjeta pertenece

    //Cuando es la primera <---------
    
    if(primeraTarjeta == null){
        primeraTarjeta = tarjetaSeleccionada

        setTimeout(()=>{

            if(primeraTarjeta !=null && segundaTarjeta == null){
                primeraTarjeta.textContent = ''
                primeraTarjeta = null;
            }

        },2000)

        
    //Cuando es la segunda
    }else if(segundaTarjeta == null){

        segundaTarjeta = tarjetaSeleccionada

        //Se suma un turno
        turnosRealizados++;


        //Valido si tarjetas coinciden
        if(primeraTarjeta.dataset.valorNumero == segundaTarjeta.dataset.valorNumero){
            

            // conteo de parejas destapados
            // incrementa las parejas encontradas
            parejasEncontradas++;

            //Llama a la funcion para revisar si ya están las parejas destapadas <----------
            if(revisarJuegoCompletado()){
                setTimeout(()=>{
                    alert("Ganaste")
                },10);
                return;
            }

            //Sacarlas del juego, quitandoles las acciones de click
            primeraTarjeta.removeEventListener('click', evaluar)
            segundaTarjeta.removeEventListener('click', evaluar)

            //Reseteo los objetos internos de cada tarjeta
            primeraTarjeta = null;
            segundaTarjeta = null;

        }else{
        //Si no coinciden entonces

            //Inactivo el juego hasta que se termine de mostrar el resultado
            puedeClickear = false;

            //Doy un paso de X segundos, para visualizar el resultado
            setTimeout(()=>{

                //Volteo nuevamente la tarjeta
                primeraTarjeta.textContent = '';
                segundaTarjeta.textContent = '';

                //Reseteo los objetos internos de cada tarjeta
                primeraTarjeta = null;
                segundaTarjeta = null;

                //Activo nuevamente la options de clickear
                puedeClickear = true;
            },1000);

        }

         //Condicional para validar la cantidad de jugadas y el maximo de turnos realizados
        if (turnosRealizados >= maxTurnos ){
            alertarJuegoPerdido();
            return;
        } 
        
    }
    
}

//Se establece la funcion para que verifique si ya completo las parejas     <--------
function revisarJuegoCompletado() {

    if(parejasEncontradas == totalPares){
        return true
    }else{
        return false;
    }

}

function alertarJuegoPerdido(){
    setTimeout(()=>{
        alert("Alcanzaste el maximo de tus turnos y no se completaron las parejas, ¡You Lose!")}
    ,10)
}



/* -----------------> Ejercicio <---------------- 
-  El juego debe terminar en cualquiera de las siguientes 2 situaciones
    1. Cuando el jugador voltea todas las cartas que coinciden. -> Mostrar una alerta de navegador (sencilla) con un mensaje que indique que el usuario gano
    
    2. Con un maximo de jugadas realizadas de 30 -> Mostrar una alerta de navegador (sencilla) con un mensaje que indique que el usuario perdio
-     
*/

