var context, first = false, analyser, ctx, fbc_array, bars, canvas, src, freqCount = 1.5;

var img = document.getElementById("image");

function freq(value){
  console.log('Nível De Frequência: ' + value);
  freqCount = value;
}

var x = window.innerWidth;
var y = window.innerHeight;

canvas = document.getElementById("canvas");
canvas.width = x;
canvas.height = y;

canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.drawImage(img, x/2 - (img.width / 2), y/2 - (img.height / 2) - 4, 200, 200);
ctx.closePath();

window.onload = function() {

  var file = document.getElementById("file");
  var audio = document.getElementById("audio");

  file.onchange = function() {
    if(first == false){
      context = new AudioContext();
      analyser = context.createAnalyser();
      analyser.fftSize = 4096;
      analyser.maxDecibels = -25;

      src = context.createMediaElementSource(audio);
      first = true;
    }

    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();

    // bassC = document.getElementById('bass').value;
    // bassFilter = context.createBiquadFilter();
    // bassFilter.type = "lowshelf";
    // bassFilter.frequency.value = 200;
    // bassFilter.gain.value = bassC;

    src.connect(analyser);
    analyser.connect(context.destination);

    frameLooper();
  }

  function frameLooper(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    x = window.innerWidth;
    y = window.innerHeight;
    ctx.drawImage(canvas, 0, 0);
    ctx.clearRect(0,0,x,y);
    window.requestAnimationFrame(frameLooper);

    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    analyser.smoothingTimeConstant = 0.7;

    var bars = 45;
    for(var i=135, b=0;i>bars;i--,b++){
      ctx.beginPath();
      var radians = i * Math.PI/90;
      var x1 = x/2 + (fbc_array[b] / freqCount) * Math.cos(radians);
      var y1 = y/2 + (fbc_array[b] / freqCount) * Math.sin(radians);
      ctx.moveTo(x/2,y/2);
      ctx.lineTo(x1,y1);
      ctx.strokeStyle = "#ff6666";
      ctx.stroke();
      ctx.closePath();
    }

    var bars = 135;
    for(var i=225, b=90;i>bars;i--,b--){
      ctx.beginPath();
      var radians = i * Math.PI/90;
      var x1 = x/2 + (fbc_array[b] / freqCount) * Math.cos(radians);
      var y1 = y/2 + (fbc_array[b] / freqCount) * Math.sin(radians);
      ctx.moveTo(x/2,y/2);
      ctx.lineTo(x1,y1);
      ctx.strokeStyle = "#ff6666";
      ctx.stroke();
      ctx.closePath();
    }

    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    analyser.smoothingTimeConstant = 0.9;

    var bars = 45;
    for(var i=135, b=0;i>bars;i--,b++){
      ctx.beginPath();
      var radians = i * Math.PI/90;
      var x1 = x/2 + (fbc_array[b] / (freqCount + 0.2)) * Math.cos(radians);
      var y1 = y/2 + (fbc_array[b] / (freqCount + 0.2)) * Math.sin(radians);
      ctx.moveTo(x/2,y/2);
      ctx.lineTo(x1,y1);
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.closePath();
    }

    var bars = 135;
    for(var i=225, b=90;i>bars;i--,b--){
      ctx.beginPath();
      var radians = i * Math.PI/90;
      var x1 = x/2 + (fbc_array[b] / (freqCount + 0.2)) * Math.cos(radians);
      var y1 = y/2 + (fbc_array[b] / (freqCount + 0.2)) * Math.sin(radians);
      ctx.moveTo(x/2,y/2);
      ctx.lineTo(x1,y1);
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.closePath();
    }

    ctx.beginPath();
    ctx.drawImage(img, x/2 - (img.width / 2), y/2 - (img.height / 2) - 4, 200, 200);
    ctx.closePath();
  }
}
