var analyser, ctx, fbc_array, bars, canvas, context, src;

var x = window.innerWidth;
var y = window.innerHeight;

canvas = document.getElementById("canvas");
canvas.width = x;
canvas.height = y;

window.onload = function() {

  var file = document.getElementById("file");
  var audio = document.getElementById("audio");

  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();

    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);

    src.connect(analyser);
    analyser.connect(context.destination);

    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");

    frameLooper();
  }

  function frameLooper(){
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0,0,x,y);
    ctx.fillStyle = '#ff6666';
    bars = 97;
    for(var i = 0; i< bars; i++){
      var bar_x = i * 14;
      var bar_width = 13;
      var bar_height = -(fbc_array[i]/1);
      ctx.fillRect(bar_x,y - (y * 10 / 100),bar_width,bar_height);
    }
  }
}
