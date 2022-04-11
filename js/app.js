'use strict';

//Variables
const contentFormulario = document.querySelector('#formulario');
const contentListarTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners

evenetListeners();

function evenetListeners() {
    contentFormulario.addEventListener('submit', agregarTweet);
    document.addEventListener('DOMContentLoaded', getLocalStorage);
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

    //funcion para agregar la informacion en el localStorage

    tweetsLocalStorage();

    //Reiniciar el formulario
    contentFormulario.reset();
}

//funcion para crear HTML

function crearHTML() {
    borrarHtml();
    if (tweets.length > 0) {

        tweets.forEach(tweet => {
            //Crear boton de eliminar
            const deleteTweet = document.createElement('a');
            deleteTweet.classList.add('borrar-tweet');
            deleteTweet.textContent = 'x';

            deleteTweet.onclick = () => {
                deleteTweetLocalStorage(tweet.id);
            }

            //Crear el HTML
            const liTweet = document.createElement('li');
            //Añadir el texto
            liTweet.textContent = tweet.tweet;
            liTweet.appendChild(deleteTweet);

            contentListarTweets.appendChild(liTweet);


        });
    }
    tweetsLocalStorage();
}

//funcion para almacenar datos en el localStorage

function tweetsLocalStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//funcion para extraer los datos del localStorage al HTML

function getLocalStorage(){
    tweets = JSON.parse( localStorage.getItem('tweets')) || [];
    crearHTML();
    console.log(tweets);
}

//funcion para eliminar tweet del localSotarge y del HTML
function deleteTweetLocalStorage(id) {
    tweets = tweets.filter(tweet => tweet.id != id);
    console.log(tweets);
    crearHTML();
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