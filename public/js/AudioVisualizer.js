var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 360;

var FFT_SIZE = 2048;

export function AudioVisualizer(audio) {
  this.canvas = document.getElementById("visualizer");

  // Init Canvas Size
  this.canvas.width = CANVAS_WIDTH;
  this.canvas.height = CANVAS_HEIGHT;

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
  let x = 0;
  const canvasContext = this.canvas.getContext("2d");
  canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.analyser.getByteFrequencyData(this.dataArray);
  for (let i = 0; i < this.bufferLength; i++) {
    let barHeight = this.dataArray[i];
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(
      x,
      CANVAS_HEIGHT - barHeight,
      this.barWidth,
      barHeight
    );

    x += this.barWidth;
  }

  requestAnimationFrame(this.animate.bind(this));
};
