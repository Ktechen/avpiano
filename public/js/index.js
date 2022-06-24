const audioContext = new AudioContext();

const StartBtn = document.getElementById("Start1");
const PauseBtn = document.getElementById("Pause1");

const StartBtn2 = document.getElementById("Start2");
const PauseBtn2 = document.getElementById("Pause2");

const StartGlobalBtn = document.getElementById("StartGlobal");
const PauseGlobalBtn = document.getElementById("PauseGlobal");

const CurrentTimeBtn = document.getElementById("CurrentTime1");

const TileBtn = document.getElementById("Tile");


let audio1 = new Audio();
let audio2 = new Audio();

audio1.src = "sounds/default_sound.mp3"
audio2.src = "sounds/LassdieSonneindeinHerz.mp3"

StartGlobalBtn.addEventListener("click", () => {
    console.log("Play all");
    audio1.play();
    audio2.play()
});

PauseGlobalBtn.addEventListener("click", () => {
    console.log("Pause all");
    audio1.pause();
    audio2.pause();
});

StartBtn.addEventListener("click", () => {
    console.log("Play");
    audio1.play();
});

StartBtn2.addEventListener("click", () => {
    console.log("Play");
    audio2.play();
});

PauseBtn.addEventListener("click", () => {
    console.log("Pause");
    audio1.pause();
});

PauseBtn2.addEventListener("click", () => {
    console.log("Pause");
    audio2.pause();
});


