'use strict';

//Variables
const contentFormulario = document.querySelector('#formulario');
const contentListarTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners

evenetListeners();

function evenetListeners() {
    contentFormulario.addEventListener('submit', agregarTweet)
}


//Funciones

function agregarTweet(e) {
    e.preventDefault();
    //Borrar HTML 

    borrarHtml();

    //Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    //Validation
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return; //Evita que se ejecuten más lineas de codigo (solo se puede usar en un if que esta dentro de una funcion)
    }
    const tweetObj = {
        id: Date.now(),
        tweet //Cuando el nombre de la llave y del valor del objeto tienen el mismo nombre solo se puede poner el nombre solo una vez
    }

    //Añadir el objeto en el arreglo de tweets

    tweets = [...tweets, tweetObj];

    //Una vez agregado vamos a crear el HTML

    crearHTML();

    //Reiniciar el formulario
    contentFormulario.reset();
}

//funcion para crear HTML

function crearHTML() {

    if (tweets.length > 0) {

        tweets.forEach(tweet => {
            //Crear el HTML
            const liTweet = document.createElement('li');
            //Añadir el texto
            liTweet.textContent = tweet.tweet;
            contentListarTweets.appendChild(liTweet);

        })
    }

}

//funcion para limpiar html anterior
function borrarHtml() {
    while (contentListarTweets.firstChild) {
        contentListarTweets.removeChild(contentListarTweets.firstChild);
    }
}


//Mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alaerta despues de 2 segundos

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}