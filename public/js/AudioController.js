import {AudioHandler} from "./AudioHandler.js";
import {AudioVisualizer} from "./AudioVisualizer.js";

var audioHandler;
var audioVisualizer;

initAudioHandler();

function initAudioHandler() {
    // Start button
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", startButtonListener);
    startButton.addEventListener("click", () => playbackRateButton.value = getPlaybackRateButtonListener);
    startButton.addEventListener("click", () => volumeButton.value = getVolumeButtonListener);

    //Pause Button
    const pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", pauseButtonListener);

    // Restart Button
    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", restartButtonListener);

    // volume Button
    const volumeButton = document.getElementById("volume-button");
    volumeButton.addEventListener("change", () => volumeButtonListener(volumeButton.value));

    // playbackRate Button
    const playbackRateButton = document.getElementById("playbackRate-button");
    playbackRateButton.addEventListener("change", () => playbackRateButtonListener(playbackRateButton.value));

    audioHandler = new AudioHandler(new Audio("sounds/default_sound.mp3"));
    audioVisualizer = new AudioVisualizer(audioHandler.getAudio());
}

/**
 * Starts a Track
 */
function startButtonListener() {
    if (!audioHandler.getIsPlaying()) {
        audioHandler.startAudio();
        audioVisualizer.drawAudio();
    }
}

/**
 * Stops a Track
 */
function pauseButtonListener() {
    audioHandler.pauseAudio();
}

/**
 * Restarts a Track
 */
function restartButtonListener() {
    audioHandler.restartAudio();
}

/**
 * volume a Track
 */
function volumeButtonListener(volume) {
    audioHandler.setVolume(volume);
}

function getVolumeButtonListener() {
    return audioHandler.getVolume();
}

function getPlaybackRateButtonListener() {
    return audioHandler.getPlaybackRate();
}

/**
 * playbackRate a Track
 */
function playbackRateButtonListener(playbackRate) {
    audioHandler.setPlaybackRate(playbackRate);
}