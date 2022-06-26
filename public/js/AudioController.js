import { AudioHandler } from "./AudioHandler.js";
import { AudioVisualizer } from "./AudioVisualizer.js";

var audioHandler;
var audioVisualizer;

initAudioHandler();
function initAudioHandler() {
  // Start button
  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", startButtonListener);

  //Pause Button
  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("click", pauseButtonListener);
  // Restart Button
  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", restartButtonListener);

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
