export class AudioHandler {
  constructor(audio) {
    this.isPlaying = false;
    this.audio = audio;
  }
  getAudio() {
    return this.audio;
  }
  getIsPlaying() {
    console.log(this.isPlaying);
    return this.isPlaying;
  }
  startAudio() {
    console.log("started audio...");
    this.isPlaying = true;
    this.audio.play();
  }
  pauseAudio() {
    console.log("stopped audio...");
    this.isPlaying = false;
    this.audio.pause();
  }
  restartAudio() {
    console.log("restarted audio...");
    this.audio.currentTime = 0;
  }
}
