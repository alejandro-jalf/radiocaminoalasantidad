$(document).ready(function() {
    let volumenActual = 1;
    let isLoadSource = false;
    var progress = document.getElementById("progress");

    document.getElementById("cont-pause").style.display = "none";
    document.getElementById("cont-stop").style.display = "none";

    reproductor.addEventListener("ended", function() {
        document.getElementById("cont-pause").style.display = "none";
        document.getElementById("cont-stop").style.display = "none";
        document.getElementById("cont-play").style.display = "inline-block";
        play = false;
    }, false);

    const setVolumenBarrMovil = function(volumen) {
        const barras = document.querySelectorAll(".barVolume");
        for (let x = 0; x < barras.length; x++) {
            barras[x].classList.remove("barActiveVolume");
        }

        for (let index = 1; index <= volumen; index++) {
            document.querySelector(".bv" + index).classList.add("barActiveVolume");
        }
    }
    setVolumenBarrMovil(10);

    document.getElementById("cont-play").addEventListener("click", function () {
        document.getElementById("cont-play").style.display = "none";
        document.getElementById("cont-pause").style.display = "inline-block";
        document.getElementById("cont-stop").style.display = "inline-block";
        if (!isLoadSource) {
            reproductor.src = statusConexion ? "https://s14.myradiostream.com/30860/listen.mp3" : "./grupo-el-rapto-tres-etapas.mp3";
            isLoadSource = true;
            if (!statusConexion) pistaActual = 2;
        }
        if (!statusConexion) play = true;
        if (statusConexion) playRadio = true;
        if (statusConexion && pistaActual === 2) {
            reproductor.src = "https://s14.myradiostream.com/30860/listen.mp3";
            pistaActual = 1;
        }
        if (!statusConexion && pistaActual === 1) {
            reproductor.src = "./grupo-el-rapto-tres-etapas.mp3";
            pistaActual = 2;
        }
        reproductor.play();
    });
    
    document.getElementById("cont-pause").addEventListener("click", function () {
        reproductor.pause();
        document.getElementById("cont-pause").style.display = "none";
        document.getElementById("cont-stop").style.display = "none";
        document.getElementById("cont-play").style.display = "inline-block";
    });

    document.getElementById("cont-stop").addEventListener("click", function() {
        document.getElementById("cont-pause").style.display = "none";
        document.getElementById("cont-stop").style.display = "none";
        document.getElementById("cont-play").style.display = "inline-block";
        reproductor.pause()
        reproductor.src = "";
        playRadio = play = isLoadSource = false;
    });
    
    document.getElementById("sub-vol").addEventListener("click", function () {
        if (reproductor.volume <= 0.9) {
            reproductor.volume += 0.1;
            volumenActual = reproductor.volume;
            setVolumenBarrMovil(parseInt(reproductor.volume * 10));
            progress.style.width = (reproductor.volume * 100) + "%";
            $("#mute-vol").removeClass('active')
        }
    });

    document.getElementById("dis-vol").addEventListener("click", function () {
        if (reproductor.volume >= 0.2) {
            reproductor.volume -= 0.1;
            volumenActual = reproductor.volume;
        } else {
            reproductor.volume = 0.0;
            $("#mute-vol").addClass('active')
        }
        setVolumenBarrMovil(parseInt(reproductor.volume * 10));
        progress.style.width = (reproductor.volume * 100) + "%";
    });

    document.getElementById("mute-vol").addEventListener("click", function () {
        if (reproductor.volume > 0) {
            reproductor.volume = 0.0;
            $("#mute-vol").addClass('active')
        } else {
            reproductor.volume = volumenActual;
            $("#mute-vol").removeClass('active')
        }
        setVolumenBarrMovil(parseInt(reproductor.volume * 10));
        progress.style.width = (reproductor.volume * 100) + "%";
    });
});