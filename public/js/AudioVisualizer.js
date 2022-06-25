class AudioVisualizer {
  constructor(audio) {
    const canvas = document.getElementById("visualizer");

    // Init Canvas Size
    canvas.width = 400;
    canvas.height = 200;

    this.audio = audio;

    //this.canvasContext = canvas.getContext("2d");

    this.canvasObj = canvas;
    this.audioSource;
    this.analyser;
  }
  /**
   * Visualizes the Track which is playing
   */
  drawAudio() {
    this.audioContext = new AudioContext();
    console.log(this.audio);
    this.audioSource = this.audioContext.createMediaElementSource(this.audio);
    this.analyser = this.audioContext.createAnalyser();

    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.analyser.fftSize = 64;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.barWidth = this.canvasObj.width / this.bufferLength;

    this.animate();
  }
  animate() {
    let x = 0;
    const canvasContext = this.canvasObj.getContext("2d");
    canvasContext.clearRect(0, 0, this.canvasObj.width, this.canvasObj.height);

    // copy data from analyser to dataArray
    this.analyser.getByteFrequencyData(this.dataArray);
    for (let i = 0; i < this.bufferLength; i++) {
      let barHeight = this.dataArray[i];
      canvasContext.fillStyle = "white";
      canvasContext.fillRect(
        x,
        this.canvasObj.height - this.barHeight,
        this.barWidth,
        barHeight
      );
      x += this.barWidth;
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}
