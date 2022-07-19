import { AudioHandler } from "./AudioHandler.js";
import { AudioVisualizer } from "./AudioVisualizer.js";
import { AudioInstance } from "./AudioInstance.js";

let audioHandler;
let audioVisualizer;
let audioInstance;

initAudioHandler();

function initAudioHandler() {
  audioInstance = new AudioInstance();
  initListener();
  const firstStartAudio = audioInstance.InstanceDict["default_sound.mp3"];
  audioHandler = firstStartAudio._AudioHandler;
  audioVisualizer = firstStartAudio._AudioVisualizer;
}

function initListener() {
  // Start button
  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", startButtonListener);
  startButton.addEventListener(
    "click",
    () => (playbackRateButton.value = getPlaybackRateButtonListener)
  );
  startButton.addEventListener(
    "click",
    () => (volumeButton.value = getVolumeButtonListener)
  );

  //Pause Button
  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("click", pauseButtonListener);

  // Restart Button
  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", restartButtonListener);

  // RestartAll Button
  const restartAllButton = document.getElementById("restartAll-button");
  restartAllButton.addEventListener("click", restartAllButtonListener);

  // volume Button
  const volumeButton = document.getElementById("volume-button");
  volumeButton.addEventListener("change", () =>
    volumeButtonListener(volumeButton.value)
  );

  // playbackRate Button
  const playbackRateButton = document.getElementById("playbackRate-button");
  playbackRateButton.addEventListener("change", () =>
    playbackRateButtonListener(playbackRateButton.value)
  );

  // loop Button
  const loopButtonFalse = document.getElementById("loopFalse-button");
  loopButtonFalse.addEventListener("click", () => loopListener(false));

  const loopButtonTrue = document.getElementById("loopTrue-button");
  loopButtonTrue.addEventListener("click", () => loopListener(true));

  // Time Span
  const CurrentTime = document.getElementById("CurrentTime");
  startButton.addEventListener("click", () => {
    setInterval(() => (CurrentTime.textContent = currentTimeListener()), 500);
  });

  // Change chosen sound
  const select = document.getElementById("song_names");
  select.addEventListener("change", (event) => {
    console.log(event.target.value);
    let dictElement = audioInstance.InstanceDict[event.target.value];
    audioHandler = dictElement._AudioHandler;
    audioVisualizer = dictElement._AudioVisualizer;
    console.log(dictElement);
  });
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
 * volume of Track
 */
function volumeButtonListener(volume) {
  audioHandler.setVolume(volume);
}

/**
 * get Volume from Track
 */
function getVolumeButtonListener() {
  return audioHandler.getVolume();
}

/**
 * get playbackRate from Track
 */
function getPlaybackRateButtonListener() {
  return audioHandler.getPlaybackRate();
}

/**
 * playbackRate of Track
 */
function playbackRateButtonListener(playbackRate) {
  audioHandler.setPlaybackRate(playbackRate);
}

/**
 * Reset all of Track
 */
function restartAllButtonListener() {
  for (const [key, value] of Object.entries(audioInstance.InstanceDict)) {
    console.log(key, value);
    value._AudioHandler.resetAll();
  }
}

/**
 * CurrentTimeListener of Track
 */
function currentTimeListener() {
  return audioHandler.getCurrentTime();
}

/**
 * loopListener of Track
 */
function loopListener(bool) {
  audioHandler.setLoop(bool);
}
