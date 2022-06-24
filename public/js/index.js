const audioContext = new AudioContext();

const StartBtn = document.getElementById("Start");
const PauseBtn = document.getElementById("Pause");

const CurrentTimeBtn = document.getElementById("CurrentTime");

let audio1 = new Audio();
audio1.src = "sounds/default_sound.mp3"

StartBtn.addEventListener("click", () => {
    console.log("Play");
    audio1.play();
});

PauseBtn.addEventListener("click", () => {
    console.log("Pause");
    audio1.pause();
    CurrentTimeBtn.textContent = "Time: " + audio1.currentTime;
});

