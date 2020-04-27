// criar o contexto de áudio
const audioContext = new AudioContext();

// instanciar elemento de audio
const audio = document.querySelector('audio');
audio.crossOrigin = "anonymous";
// converter para contexto de áudio
const track = audioContext.createMediaElementSource(audio);

// conectar nó ao destino
track.connect(audioContext.destination);

// definir botão de play/pause
const playButton = document.querySelector('button');

playButton.addEventListener('click', function() {
    // chechar se audio context está pausado (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // tocar ou pausar audio
    if (this.dataset.playing === 'false') {
        audio.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audio.pause();
        this.dataset.playing = 'false';
    }

}, false);

// quando a faixa parar o play é dclarado como false
audio.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
}, false);
