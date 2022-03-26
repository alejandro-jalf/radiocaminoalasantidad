$(document).ready(function() {
    let volumenActual = 100;
    let isLoadSource = false;
    var controlVolume = document.getElementById("controlVolume");
    var textVolumeActual = document.getElementById("volumeActual");

    document.getElementById("cont-pause").style.display = "none";
    document.getElementById("cont-stop").style.display = "none";

    reproductor.addEventListener("ended", function() {
        document.getElementById("cont-pause").style.display = "none";
        document.getElementById("cont-stop").style.display = "none";
        document.getElementById("cont-play").style.display = "inline-block";
        play = false;
    }, false);

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

    controlVolume.addEventListener("input", function() {
        const volumen = controlVolume.value;
        textVolumeActual.innerHTML = volumen;
        volumenActual = volumen;
        reproductor.volume = (volumen / 100)
        if (volumen == 0) $("#mute-vol").addClass('active');
        else $("#mute-vol").removeClass('active')
    }, false);

    document.getElementById("mute-vol").addEventListener("click", function () {
        if (reproductor.volume > 0) {
            reproductor.volume = 0.0;
            $("#span-mute").removeClass('icofont-volume-up');
            $("#span-mute").addClass('icofont-ui-mute');
        } else {
            textVolumeActual.innerHTML = volumenActual;
            reproductor.volume = (volumenActual / 100);
            $("#span-mute").removeClass('icofont-ui-mute');
            $("#span-mute").addClass('icofont-volume-up');
        }
        controlVolume.value = reproductor.volume * 100;
        textVolumeActual.innerHTML = reproductor.volume * 100;
    });
});