$(document).ready(function () {
    const statusElement = document.getElementById("statusConexion");
    const listenersElement = document.getElementById("listenersConexion");
    const musicConexion = document.getElementById("musicConexion");
    const spanListenerNumber = document.getElementById("spanListenerNumber");
    const titleMusic = document.getElementById("titleMusic");
    let listenersData = 0;
    let expresion = new RegExp('');
    let contadorDataStream = 0;
    let textStatus = 'Reproduccion en linea';
    let textTitle = 'Radio Camino a la Santidad';
    let isFocusedWindow = true;

    const setEventsWindow = function () {
        window.addEventListener("focus", function() {
            isFocusedWindow = true;
            const date = new Date();
            console.log("Ha ganado el foco", `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`);
        });
        window.onblur = function() {
            isFocusedWindow = false;
            const date = new Date();
            console.log("Ha perdido el foco", `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`);
        };
    }

    const setDataStream = function() {
        if (contadorDataStream === 0) {
            // Datos de los oyentes
            listenersData = (listenersElement.innerHTML).toString().slice(80);
            // Datos del estado
            expresion = new RegExp('<script src="https://scripts.myradiostream.com/s14/30860/status.js"></script>Online');
            statusConexion = expresion.test(statusElement.innerHTML);
            textStatus = statusConexion ? 'Reproduccion en linea' : 'Fuera del aire';
            if (!statusConexion && playRadio) {
                reproductor.pause();
                reproductor.src = "./grupo-el-rapto-tres-etapas.mp3";
                reproductor.play();
                playRadio = false;
                play = true;
            }
            // Datos del titulo
            textTitle = 'Radio Camino a la Santidad';
            if (statusConexion) {
                if ((musicConexion.innerHTML).slice(75) !== "Not Available") {
                    textTitle = (musicConexion.innerHTML).slice(75);
                }
            } else {
                if (play) {
                    textTitle = 'Grupo el rapto - Tres etapas.mp3';
                }
            }
        } else {
            if(isFocusedWindow){
                axios.get('https://inifinitilight.com/api/v1/radio/data')
                .then(function (response) {
                    // Datos de los oyentes
                    listenersData = ((response.data.data.listeners).length >= 12) ? (response.data.data.listeners).slice(12) : response.data.data.listeners;
                    // Datos del estado
                    statusConexion = false;
                    if (response.data.data.status === "Offline (No Server Connection)") textStatus = 'Fuera del aire';
                    if (response.data.data.status === "Offline (No Source)") textStatus = 'Fuera del aire (Sin sonido)';
                    if (response.data.data.status === "Online") {
                        textStatus = 'Reproduccion en linea';
                        statusConexion = true;
                    }
                    if (playRadio && !statusConexion) {
                        reproductor.pause();
                        reproductor.src = "./grupo-el-rapto-tres-etapas.mp3";
                        reproductor.play();
                        playRadio = false;
                        play = true;
                        pistaActual = 2;
                    }
                    if (play && statusConexion) {
                        play = false;
                        playRadio = true;
                        reproductor.pause()
                        reproductor.src = "https://s14.myradiostream.com/30860/listen.mp3";
                        reproductor.play();
                        pistaActual = 1;
                    }
                    // Datos del titulo
                    if (statusConexion) {
                        if (response.data.data.title === 'The current song is not available') {
                            textTitle = 'Radio Camino a la Santidad';
                        } else {
                            textTitle = response.data.data.title;
                        }
                    } else {
                        if (play) {
                            textTitle = 'Grupo el rapto - Tres etapas.mp3';
                        }
                    }
                })
                .catch(function (error) {
                    textTitle = 'Radio Camino a la Santidad';
                    textStatus = 'Reproduccion en linea';
                    console.log(error);
                });
            }
        }

        if (statusConexion) {
            document.getElementById("span-stat").classList.add("icofont-toggle-on");
            document.getElementById("span-stat").classList.remove("icofont-toggle-off");
            document.getElementById("span-stat").style.color = "#76ff03";
        } else {
            document.getElementById("span-stat").classList.remove("icofont-toggle-on");
            document.getElementById("span-stat").classList.add("icofont-toggle-off");
            document.getElementById("span-stat").style.color = "#7f0000";
        }

        // Carga de datos
        document.getElementById("status-conexion-text").innerHTML = textStatus;
        spanListenerNumber.innerHTML = listenersData;
        titleMusic.innerHTML = textTitle;

        contadorDataStream ++;
        setTimeout(setDataStream, 2000);
    }
    
    setDataStream();
    setEventsWindow();
});
