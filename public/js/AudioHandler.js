class AudioHandler {
  constructor(path) {
    this.audio = new Audio(path);
  }
  getAudio() {
    return this.audio;
  }

  startAudio() {
    console.log("started audio...");
    this.audio.play();
  }
  pauseAudio() {
    console.log("stopped audio...");
    this.audio.pause();
  }
  restartAudio() {
    console.log("restarted audio...");
    this.audio.currentTime = 0;
  }
}
