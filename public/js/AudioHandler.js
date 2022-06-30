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

    setVolume(volume) {
        console.log("Current Volume" + this.audio.volume);
        this.audio.volume = volume;
    }

    restartAudio() {
        console.log("restarted audio...");
        this.audio.currentTime = 0;
    }

    setPlaybackRate(playbackRate){
        console.log("Speed of audio: " + this.audio.playbackRate)
        this.audio.playbackRate = playbackRate;
    }

    getPlaybackRate(){
        return this.audio.playbackRate;
    }

    getVolume(){
        return this.audio.volume;
    }

    resetAll(){
        console.log("resetAll");
        this.audio.currentTime = 0;
        this.audio.volume = 1;
        this.audio.playbackRate = 1;
    }
}
