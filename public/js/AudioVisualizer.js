var CANVAS_WIDTH = 388;
var CANVAS_HEIGHT = 100;

var FFT_SIZE = 2048;
export function AudioVisualizer(audio) {
  this.canvas = document.getElementById("visualizer");

  // Init Canvas Size
  this.canvas.width = CANVAS_WIDTH;
  this.canvas.height = CANVAS_HEIGHT;
  this.canvasContext = this.canvas.getContext("2d");

  this.audio = audio;

  this.audioSource;
  this.analyser;
}
/**
 * Visualizes the Track which is playing
 */
AudioVisualizer.prototype.drawAudio = function () {
  this.audioContext = new AudioContext();
  this.audioSource = this.audioContext.createMediaElementSource(this.audio);
  this.analyser = this.audioContext.createAnalyser();

  this.audioSource.connect(this.analyser);
  this.analyser.connect(this.audioContext.destination);

  this.analyser.fftSize = FFT_SIZE;

  this.bufferLength = this.analyser.frequencyBinCount;
  this.dataArray = new Uint8Array(this.bufferLength);

  this.barWidth = this.canvas.width / this.bufferLength;

  this.animate();
};

/**
 * Animates the Visualization
 */
AudioVisualizer.prototype.animate = function () {
  this.canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  this.analyser.getByteTimeDomainData(this.dataArray);
  this.canvasContext.fillStyle = "rgb(200, 200, 200)";
  this.canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  this.canvasContext.lineWidth = 2;
  this.canvasContext.strokeStyle = "rgb(0, 0, 0)";
  this.canvasContext.beginPath();

  const sliceWidth = (CANVAS_WIDTH) / this.bufferLength;
  let x = 0;

  for (let i = 0; i < this.bufferLength; i++) {
    const v = this.dataArray[i] / 128.0;
    const y = (v * CANVAS_HEIGHT) / 2;

    if (i === 0) {
      this.canvasContext.moveTo(x, y);
    } else {
      this.canvasContext.lineTo(x, y);
    }

    x += sliceWidth;
  }
  this.canvasContext.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
  this.canvasContext.stroke();

  requestAnimationFrame(this.animate.bind(this));
};
